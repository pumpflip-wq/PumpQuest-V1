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
