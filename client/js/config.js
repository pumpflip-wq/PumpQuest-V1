
define(['text!../config/config_build.json'],
function(build) {
    var defaultBuild = { host: "", port: (window.location.protocol === "https:" ? 443 : 80), dispatcher: false },
        parsedBuild = defaultBuild;

    try {
        parsedBuild = JSON.parse(build);
    } catch(e) {
        parsedBuild = defaultBuild;
    }

    var config = {
        dev: { host: window.location.hostname, port: window.location.port || (window.location.protocol === "https:" ? 443 : 80), dispatcher: false },
        build: parsedBuild
    };
    
    //>>excludeStart("prodHost", pragmas.prodHost);
    if(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        require(['text!../config/config_local.json'], function(local) {
            try {
                config.local = JSON.parse(local);
            } catch(e) {
                // Exception triggered when config_local.json does not exist. Nothing to do here.
            }
        });
    }
    //>>excludeEnd("prodHost");
    
    return config;
});
