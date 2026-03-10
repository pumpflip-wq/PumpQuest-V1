var express = require('express');
var http = require('http');
var httpProxy = require('http-proxy');
var path = require('path');

var app = express();
var proxy = httpProxy.createProxyServer({ ws: true });

var GAME_SERVER_PORT = 8000;
var STATIC_SERVER_PORT = 5000;

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
    console.log('BrowserQuest client server running on port ' + STATIC_SERVER_PORT);
    console.log('WebSocket connections proxied to game server on port ' + GAME_SERVER_PORT);
});
