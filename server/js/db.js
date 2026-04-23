var Pool = require('pg').Pool;

var pool = null,
    initialized = false;

function resolveDatabaseUrl() {
    var raw = process.env.DATABASE_URL,
        parsed;

    if(!raw) {
        return "";
    }

    if(Array.isArray(raw)) {
        return (raw[0] || "").toString();
    }

    if(typeof raw !== 'string') {
        return String(raw);
    }

    if(raw[0] === '[') {
        try {
            parsed = JSON.parse(raw);
            if(Array.isArray(parsed) && parsed.length > 0) {
                return String(parsed[0]);
            }
        } catch (e) {
            // ignore and fallback to raw
        }
    }

    return raw.trim();
}

function isEnabled() {
    return !!resolveDatabaseUrl();
}

function getPool() {
    var databaseUrl = resolveDatabaseUrl();

    if(!databaseUrl) {
        return null;
    }
    if(!pool) {
        pool = new Pool({
            connectionString: databaseUrl,
            ssl: process.env.PGSSL_DISABLE === 'true' ? false : { rejectUnauthorized: false }
        });
    }
    return pool;
}

async function init() {
    if(initialized || !isEnabled()) {
        return;
    }

    var db = getPool();
    await db.query("CREATE TABLE IF NOT EXISTS player_wallet_sessions (id SERIAL PRIMARY KEY, wallet_address TEXT NOT NULL, player_name TEXT NOT NULL, world_id TEXT, last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(wallet_address))");
    await db.query("CREATE TABLE IF NOT EXISTS player_leaderboard (id SERIAL PRIMARY KEY, wallet_address TEXT NOT NULL, player_name TEXT NOT NULL, score INTEGER NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(wallet_address))");
    await db.query("CREATE INDEX IF NOT EXISTS idx_player_leaderboard_score ON player_leaderboard (score DESC)");
    initialized = true;
}

async function recordWalletSession(walletAddress, playerName, worldId) {
    if(!walletAddress || !isEnabled()) {
        return;
    }

    await init();
    var db = getPool();
    await db.query(
        "INSERT INTO player_wallet_sessions (wallet_address, player_name, world_id, last_seen) VALUES ($1, $2, $3, NOW()) ON CONFLICT (wallet_address) DO UPDATE SET player_name = EXCLUDED.player_name, world_id = EXCLUDED.world_id, last_seen = NOW()",
        [walletAddress, playerName || 'wallet-player', worldId || null]
    );
}

async function getPlayerByWallet(walletAddress) {
    if(!walletAddress || !isEnabled()) {
        return null;
    }

    await init();
    var db = getPool();
    var result = await db.query(
        "SELECT player_name, world_id, last_seen FROM player_wallet_sessions WHERE wallet_address = $1 LIMIT 1",
        [walletAddress]
    );

    if(result.rows && result.rows.length > 0) {
        return result.rows[0];
    }
    return null;
}

async function upsertScore(walletAddress, playerName, score) {
    if(!walletAddress || !isEnabled()) {
        return;
    }
    if(typeof score !== 'number' || !isFinite(score) || score < 0) {
        return;
    }

    await init();
    var db = getPool();
    await db.query(
        "INSERT INTO player_leaderboard (wallet_address, player_name, score, updated_at) VALUES ($1, $2, $3, NOW()) " +
        "ON CONFLICT (wallet_address) DO UPDATE SET " +
        "player_name = EXCLUDED.player_name, " +
        "score = GREATEST(player_leaderboard.score, EXCLUDED.score), " +
        "updated_at = NOW()",
        [walletAddress, (playerName || 'wallet-player').substr(0, 32), Math.floor(score)]
    );
}

async function getTopScores(limit) {
    if(!isEnabled()) {
        return [];
    }

    await init();
    var db = getPool();
    var n = (typeof limit === 'number' && limit > 0) ? Math.min(Math.floor(limit), 100) : 10;
    var result = await db.query(
        "SELECT wallet_address, player_name, score FROM player_leaderboard ORDER BY score DESC, updated_at ASC LIMIT $1",
        [n]
    );
    return (result.rows || []).map(function(row) {
        return { name: row.player_name, score: row.score, wallet: row.wallet_address };
    });
}

async function getScoreByWallet(walletAddress) {
    if(!walletAddress || !isEnabled()) {
        return 0;
    }
    await init();
    var db = getPool();
    var result = await db.query(
        "SELECT score FROM player_leaderboard WHERE wallet_address = $1 LIMIT 1",
        [walletAddress]
    );
    if(result.rows && result.rows.length > 0) {
        return result.rows[0].score || 0;
    }
    return 0;
}

module.exports = {
    isEnabled: isEnabled,
    init: init,
    recordWalletSession: recordWalletSession,
    getPlayerByWallet: getPlayerByWallet,
    upsertScore: upsertScore,
    getTopScores: getTopScores,
    getScoreByWallet: getScoreByWallet
};
