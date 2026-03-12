var Pool = require('pg').Pool;

var pool = null,
    initialized = false;

function isEnabled() {
    return !!process.env.DATABASE_URL;
}

function getPool() {
    if(!isEnabled()) {
        return null;
    }
    if(!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
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

module.exports = {
    isEnabled: isEnabled,
    init: init,
    recordWalletSession: recordWalletSession
};
