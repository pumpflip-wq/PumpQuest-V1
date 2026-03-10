
var Types = require("../../shared/js/gametypes");

var Properties = {
    doge: {
        drops: {
            energydrink: 40,
            pizza: 10,
            redherring: 5
        },
        hp: 25,
        armor: 1,
        weapon: 1
    },
    
    pepe: {
        drops: {
            energydrink: 40,
            mailarmor: 10,
            gmhandle: 20,
            redherring: 5
        },
        hp: 110,
        armor: 2,
        weapon: 2
    },
    
    wojak: {
        drops: {
            energydrink: 50,
            leatherarmor: 20,
            gmhandle: 10,
            redherring: 5
        },
        hp: 90,
        armor: 2,
        weapon: 1
    },
    
    chad: {
        drops: {
            pizza: 10,
            energydrink: 50,
            platearmor: 20,
            diamondhandle: 20,
            redherring: 5
        },
        hp: 200,
        armor: 3,
        weapon: 2
    },
    
    memecoin: {
        drops: {
            energydrink: 30,
            goldenarmor: 40,
            lambohandle: 30,
            redherring: 5
        },
        hp: 250,
        armor: 2,
        weapon: 4
    },
    
    troll: {
        drops: {
            pizza: 95,
            redherring: 5
        },
        hp: 250,
        armor: 3,
        weapon: 3
    },
    
    normie: {
        drops: {
            energydrink: 50,
            gmhandle: 20,
            leatherarmor: 10,
            redherring: 5
        },
        hp: 60,
        armor: 2,
        weapon: 1
    },
    
    ngmi: {
        drops: {
            energydrink: 50,
            mailarmor: 10,
            diamondhandle: 10,
            redherring: 5
        },
        hp: 150,
        armor: 3,
        weapon: 2
    },
    
    bagholder: {
        drops: {
            energydrink: 60,
            platearmor: 15,
            bluehandle: 15,
            redherring: 5
        },
        hp: 200,
        armor: 3,
        weapon: 3
    },
    
    shill: {
        drops: {
            energydrink: 50,
            goldenarmor: 20,
            lambohandle: 10,
            redherring: 5
        },
        hp: 200,
        armor: 3,
        weapon: 3
    },
    
    paperhands: {
        drops: {
            energydrink: 50,
            gmhandle: 10,
            redherring: 5
        },
        hp: 80,
        armor: 2,
        weapon: 1
    },
    
    fudster: {
        drops: {
            energydrink: 50,
            platearmor: 20,
            redherring: 5
        },
        hp: 100,
        armor: 2,
        weapon: 6
    },
    
    finalmonk: {
        drops: {
            moonshothandle: 100
        },
        hp: 700,
        armor: 6,
        weapon: 7
    }
};

Properties.getArmorLevel = function(kind) {
    try {
        if(Types.isMob(kind)) {
            return Properties[Types.getKindAsString(kind)].armor;
        } else {
            return Types.getArmorRank(kind) + 1;
        }
    } catch(e) {
        log.error("No level found for armor: "+Types.getKindAsString(kind));
    }
};

Properties.getWeaponLevel = function(kind) {
    try {
        if(Types.isMob(kind)) {
            return Properties[Types.getKindAsString(kind)].weapon;
        } else {
            return Types.getWeaponRank(kind) + 1;
        }
    } catch(e) {
        log.error("No level found for weapon: "+Types.getKindAsString(kind));
    }
};

Properties.getHitPoints = function(kind) {
    return Properties[Types.getKindAsString(kind)].hp;
};

module.exports = Properties;