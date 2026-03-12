# Memecoin Universe

A massively multiplayer browser-based meme-themed adventure game built with HTML5/JavaScript. Explore a universe filled with iconic internet meme characters like Doge, Pepe, Wojak, and Chad as you battle your way through the memetic landscape.

## Architecture

- **Frontend**: Static HTML5/JS game client served by Express on port 5000
- **Backend**: Node.js WebSocket game server on port 8000
- **WebSocket proxy**: The static server (port 5000) proxies WebSocket connections to the game server (port 8000)

## Game Theme

This is a meme-themed reimagining of the classic BrowserQuest game with:
- **Characters**: Doge, Pepe, Wojak, Chad, Memecoin Hero
- **Items**: Energy drinks, pizza, red herrings, hoodies, and various "handles" (weapons)
- **Enemies**: Trolls, paper hands traders, FUDsters, shills, and more crypto/meme culture references
- **Gameplay**: Classic 2D multiplayer action with a modern internet meme aesthetic

## Workflows

- **Start application** (`node server-static.js`): Serves client files on port 5000 and proxies WebSocket connections to the game server
- **Game Server** (`node server/js/main.js`): WebSocket game server running on port 8000

## Project Structure

```
client/         - Frontend game client (HTML5/JS/CSS)
  config/       - Client configuration files
    config_local.json       - Local dev config (WebSocket host/port)
    config_build.json       - Build config
  js/           - Game client JavaScript modules
  css/          - Stylesheets
  img/          - Game sprites and images
  sprites/      - Sprite definitions (JSON)
  maps/         - Client map data

server/         - Backend game server
  js/           - Server JavaScript modules
  maps/         - Server map data
  config.json   - Default server configuration

shared/         - Shared code between client and server
  js/gametypes.js - Game type definitions

server-static.js - Express static file server with WebSocket proxy
```

## Configuration

### Client WebSocket Config (`client/config/config_local.json`)
- `host`: Replit dev domain for WebSocket connections
- `port`: 443 (WSS via Replit proxy)
- `dispatcher`: false (connect directly to game server)

### Game Server (`server/config.json`)
- Port: 8000
- 5 worlds, 200 players per world
- Metrics disabled (memcache not required)

## Key Implementations & Fixes

1. **package.json**: Fixed version constraints and deployment scripts
2. **server/js/map.js**: Replaced deprecated `path.exists()` with `fs.access()`
3. **client/js/gameclient.js**: Added WSS support for HTTPS environments (Replit proxy)
4. **server-static.js**: Express server with WebSocket proxy to game server
5. **server/js/worldserver.js**: Fixed mob despawn - sends message to attacking player for immediate removal
6. **client/css/main.css**: 
   - Enlarged canvas (desktop: 750px, mobile: 260px) for better visibility
   - Made canvas responsive with width:100% and height:100%
   - Fixed body/html sizing to eliminate margins/padding
7. **client/index.html**: 
   - Cleaned up duplicate footer elements
   - "About PumpQuest" page with token info, CA display, and buy/social links
   - "PumpQuest Token" page (Credits) with DeFi links and community links
   - PumpQuest logo integrated in landing page
   - Leaderboard button visible with 🏆 emoji (was hidden, now showing)
8. **client/js/app.js**: 
   - Initialize all UI links from project.json
   - About page: Telegram, Twitter, Website links
   - Token page: social links and buy links
   - Leaderboard system tracking top Crypto Hunters
   - Market score tracking and display
9. **client/js/main.js**:
   - Leaderboard button click handler fully wired
   - All UI buttons properly bound with event listeners
10. **client/config/project.json**: Complete PumpQuest config with:
   - Token info (name, symbol, contract address)
   - Social links (Telegram, Twitter, Website)
   - Market scoring system with points for enemy defeat, fragment collection, area clearing
   - Crypto-themed entity names (Rug Dev, Paper Hands, FUD Bot, Market Manipulator)
   - Token fragments system (DOGE, PEPE, WOJAK, CHAD fragments)
   - Zone progression with difficulty levels
11. **client/js/storage.js**: 
   - Added fragment collection tracking
   - Added enemy defeat counter
   - Leaderboard persistence with local storage
   - Extended storage to persist crypto-themed progression
12. **client/js/game.js**:
   - Area name display system for zone progression messages
   - Market score updates for exploration and combat
   - Entity removal properly handled via destroy messages
13. **Real-time leaderboard (all connected players)**:
   - `shared/js/gametypes.js`: Added SCORE (27) and LEADERBOARD (28) message types
   - `server/js/format.js`: Added SCORE format validation ['n']
   - `server/js/message.js`: Added Messages.Leaderboard class
   - `server/js/player.js`: Handles SCORE message from client, updates player.score
   - `server/js/worldserver.js`: broadcastLeaderboard() sends sorted player list to all; called on join/leave/score
   - `client/js/gameclient.js`: sendScore() sends score to server; receiveLeaderboard handler
   - `client/js/game.js`: Sends score to server on updateMarketScore; onLeaderboardUpdate callback
   - `client/js/app.js`: updateServerLeaderboard() stores server data; renderLeaderboard uses server data when available
   - `client/index.html`: Leaderboard title changed to "Players Online"
14. **Health bar overflow fix (large screens)**:
   - `client/css/main.css`: In min-width:1501px override, moved #market-score-box from top:20px to top:8px (within 34px bar-container) and added overflow:hidden to #bar-container

## Dependencies

- `express`: Static file server
- `http-proxy`: WebSocket proxy middleware
- `websocket` + `websocket-server` (from GitHub): Dual WebSocket protocol support
- `underscore`, `log@1.4.0`, `bison`, `sanitizer@0.0.8`: Game server utilities
