Memecoin Universe
============

Memecoin Universe is a HTML5/JavaScript multiplayer game experiment.


Documentation
-------------

Documentation is located in client and server directories.


License
-------

Code is licensed under MPL 2.0. Content is licensed under CC-BY-SA 3.0.
See the LICENSE file for details.


Credits
-------
Created by [Little Workshop](http://www.littleworkshop.fr):

* Franck Lecollinet - [@whatthefranck](http://twitter.com/whatthefranck)
* Guillaume Lecollinet - [@glecollinet](http://twitter.com/glecollinet)

## Railway deployment notes

- Serve the static client on `PORT` and proxy websocket upgrades to the game server (`GAME_PORT`, default `8000`).
- For HTTPS deployments, the client should connect with `wss://<host>/` (no explicit port) unless you intentionally expose a non-default port.
- Keep `client/config/config_build.json` present in production so the browser does not fallback to parsing HTML as JSON.

## Solana wallet login + PostgreSQL

- Login now uses **Solana wallet connection** (Phantom provider) with an optional nickname.
- The HELLO handshake sends wallet address and a signed login proof (message + signature) to the server, while player display name is nickname (or shortened wallet when nickname is empty).
- Wallet login is verified server-side with Ed25519 signature verification before player entry is accepted.
- Optional persistence is enabled when `DATABASE_URL` exists; server creates `player_wallet_sessions` table automatically.
- Railway recommended env vars:
  - `DATABASE_URL=<Railway Postgres URL>`
  - `PGSSL_DISABLE=false` (default SSL mode for hosted Postgres)
- Replit can point to the same external Railway DB by setting the same `DATABASE_URL` secret.
