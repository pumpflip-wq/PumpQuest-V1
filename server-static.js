var express = require('express');
var http = require('http');
var httpProxy = require('http-proxy');
var path = require('path');
var DB = require('./server/js/db');

var app = express();
var proxy = httpProxy.createProxyServer({ ws: true });

var GAME_SERVER_PORT = process.env.GAME_PORT || 8000;
var STATIC_SERVER_PORT = process.env.PORT || 5000;

// Disable caching in development
app.use(function(req, res, next) {
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
});

// Serve static files with trust proxy for Replit preview
app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, 'client')));
app.use('/shared', express.static(path.join(__dirname, 'shared')));

// API: lookup saved player profile by wallet address
app.get('/api/player', async function(req, res) {
    var wallet = (req.query.wallet || '').toString().trim();
    if(!wallet) {
        return res.status(400).json({ error: 'Missing wallet parameter' });
    }
    if(!DB.isEnabled()) {
        return res.json({ player_name: null });
    }
    try {
        var result = await DB.getPlayerByWallet(wallet);
        res.json(result || { player_name: null });
    } catch(err) {
        console.error('API /api/player error:', err.message);
        res.json({ player_name: null });
    }
});

var server = http.createServer(app);

server.on('upgrade', function(req, socket, head) {
    proxy.ws(req, socket, head, { target: 'ws://localhost:' + GAME_SERVER_PORT });
});

proxy.on('error', function(err, req, res) {
    console.error('Proxy error:', err.message);
    if (res && res.writeHead) {
        res.writeHead(502);
        res.end('Proxy error: ' + err.message);
    }
});

server.listen(STATIC_SERVER_PORT, '0.0.0.0', function() {
    console.log('Memecoin Universe client server running on port ' + STATIC_SERVER_PORT);
    console.log('WebSocket connections proxied to game server on port ' + GAME_SERVER_PORT);
    console.log('NODE_ENV: ' + (process.env.NODE_ENV || 'development'));
});
