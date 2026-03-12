
Types = {
    Messages: {
        HELLO: 0,
        WELCOME: 1,
        SPAWN: 2,
        DESPAWN: 3,
        MOVE: 4,
        LOOTMOVE: 5,
        AGGRO: 6,
        ATTACK: 7,
        HIT: 8,
        HURT: 9,
        HEALTH: 10,
        CHAT: 11,
        LOOT: 12,
        EQUIP: 13,
        DROP: 14,
        TELEPORT: 15,
        DAMAGE: 16,
        POPULATION: 17,
        KILL: 18,
        LIST: 19,
        WHO: 20,
        ZONE: 21,
        DESTROY: 22,
        HP: 23,
        BLINK: 24,
        OPEN: 25,
        CHECK: 26,
        SCORE: 27,
        LEADERBOARD: 28
    },
    
    Entities: {
        WARRIOR: 1,
        
        // Mobs
        DOGE: 2,
        PEPE: 3,
        WOJAK: 4,
        CHAD: 5,
        MEMECOIN: 6,
        NORMIE: 7,
        PAPERHANDS: 8,
        FUDSTER: 9,
        SHILL: 10,
        NGMI: 11,
        BAGHOLDER: 12,
        FINALMONK: 13,
        TROLL: 14,

        // Legacy mob aliases (engine compatibility)
        RAT: 2,
        SKELETON: 3,
        SKELETON2: 4,
        OGRE: 5,
        DEATHKNIGHT: 6,
        GOBLIN: 7,
        CRAB: 8,
        SNAKE: 9,
        EYE: 10,
        BAT: 11,
        WIZARD: 12,
        BOSS: 13,
        SPECTRE: 14,
        
        // Armors
        CLOTHARMOR: 20,
        LEATHERARMOR: 21,
        MAILARMOR: 22,
        PLATEARMOR: 23,
        GOLDENARMOR: 24,
        REDARMOR: 25,
        
        // Objects
        ENERGYDRINK: 35,
        PIZZA: 36,
        CHEST: 37,
        REDHERRING: 38,
        TENDIES: 39,

        // Legacy object aliases
        FLASK: 35,
        CAKE: 36,
        BURGER: 38,
        FIREPOTION: 39,
        
        // NPCs
        GUARD: 40,
        KING: 41,
        OCTOCAT: 42,
        VILLAGEGIRL: 43,
        VILLAGER: 44,
        PRIEST: 45,
        SCIENTIST: 46,
        AGENT: 47,
        RICK: 48,
        NYAN: 49,
        SORCERER: 50,
        BEACHNPC: 51,
        FORESTNPC: 52,
        DESERTNPC: 53,
        LAVANPC: 54,
        CODER: 55,
        
        // Weapons
        GMHANDLE: 60,
        DIOPTIONHANDLE: 61,
        LAMBOHANDLE: 62,
        MOONSHOTHANDLE: 63,
        DIAMONDHANDLE: 64,
        BLUEHANDLE: 65,
        BLUEHANDLE2: 66,

        // Legacy weapon aliases
        SWORD2: 60,
        AXE: 61,
        BLUESWORD: 62,
        GOLDENSWORD: 63,
        REDSWORD: 64,
        SWORD1: 65,
        MORNINGSTAR: 66
    },
    
    Orientations: {
        UP: 1,
        DOWN: 2,
        LEFT: 3,
        RIGHT: 4
    }
};

var kinds = {
    warrior: [Types.Entities.WARRIOR, "player"],
    
    doge: [Types.Entities.DOGE, "mob"],
    pepe: [Types.Entities.PEPE, "mob"],
    wojak: [Types.Entities.WOJAK, "mob"],
    chad: [Types.Entities.CHAD, "mob"],
    memecoin: [Types.Entities.MEMECOIN, "mob"],
    troll: [Types.Entities.TROLL, "mob"],
    normie: [Types.Entities.NORMIE, "mob"],
    ngmi: [Types.Entities.NGMI, "mob"],
    paperhands: [Types.Entities.PAPERHANDS, "mob"],
    fudster: [Types.Entities.FUDSTER, "mob"],
    shill: [Types.Entities.SHILL, "mob"],
    bagholder: [Types.Entities.BAGHOLDER, "mob"],
    finalmonk: [Types.Entities.FINALMONK, "mob"],

    rat: [Types.Entities.RAT, "mob"],
    skeleton: [Types.Entities.SKELETON, "mob"],
    skeleton2: [Types.Entities.SKELETON2, "mob"],
    ogre: [Types.Entities.OGRE, "mob"],
    deathknight: [Types.Entities.DEATHKNIGHT, "mob"],
    goblin: [Types.Entities.GOBLIN, "mob"],
    crab: [Types.Entities.CRAB, "mob"],
    snake: [Types.Entities.SNAKE, "mob"],
    eye: [Types.Entities.EYE, "mob"],
    bat: [Types.Entities.BAT, "mob"],
    wizard: [Types.Entities.WIZARD, "mob"],
    boss: [Types.Entities.BOSS, "mob"],
    spectre: [Types.Entities.SPECTRE, "mob"],

    gmhandle: [Types.Entities.GMHANDLE, "weapon"],
    dioptionhandle: [Types.Entities.DIOPTIONHANDLE, "weapon"],
    bluehandle: [Types.Entities.BLUEHANDLE, "weapon"],
    lambohandle: [Types.Entities.LAMBOHANDLE, "weapon"],
    moonshothandle: [Types.Entities.MOONSHOTHANDLE, "weapon"],
    diamondhandle: [Types.Entities.DIAMONDHANDLE, "weapon"],
    bluehandle2: [Types.Entities.BLUEHANDLE2, "weapon"],
    sword2: [Types.Entities.SWORD2, "weapon"],
    axe: [Types.Entities.AXE, "weapon"],
    bluesword: [Types.Entities.BLUESWORD, "weapon"],
    goldensword: [Types.Entities.GOLDENSWORD, "weapon"],
    redsword: [Types.Entities.REDSWORD, "weapon"],
    sword1: [Types.Entities.SWORD1, "weapon"],
    morningstar: [Types.Entities.MORNINGSTAR, "weapon"],
    
    clotharmor: [Types.Entities.CLOTHARMOR, "armor"],
    leatherarmor: [Types.Entities.LEATHERARMOR, "armor"],
    mailarmor: [Types.Entities.MAILARMOR, "armor"],
    platearmor: [Types.Entities.PLATEARMOR, "armor"],
    goldenarmor: [Types.Entities.GOLDENARMOR, "armor"],
    redarmor: [Types.Entities.REDARMOR, "armor"],

    energydrink: [Types.Entities.ENERGYDRINK, "object"],
    tendies: [Types.Entities.TENDIES, "object"],
    pizza: [Types.Entities.PIZZA, "object"],
    chest: [Types.Entities.CHEST, "object"],
    redherring: [Types.Entities.REDHERRING, "object"],
    flask: [Types.Entities.FLASK, "object"],
    cake: [Types.Entities.CAKE, "object"],
    burger: [Types.Entities.BURGER, "object"],
    firepotion: [Types.Entities.FIREPOTION, "object"],

    guard: [Types.Entities.GUARD, "npc"],
    villagegirl: [Types.Entities.VILLAGEGIRL, "npc"],
    villager: [Types.Entities.VILLAGER, "npc"],
    coder: [Types.Entities.CODER, "npc"],
    scientist: [Types.Entities.SCIENTIST, "npc"],
    priest: [Types.Entities.PRIEST, "npc"],
    king: [Types.Entities.KING, "npc"],
    rick: [Types.Entities.RICK, "npc"],
    nyan: [Types.Entities.NYAN, "npc"],
    sorcerer: [Types.Entities.SORCERER, "npc"],
    agent: [Types.Entities.AGENT, "npc"],
    octocat: [Types.Entities.OCTOCAT, "npc"],
    beachnpc: [Types.Entities.BEACHNPC, "npc"],
    forestnpc: [Types.Entities.FORESTNPC, "npc"],
    desertnpc: [Types.Entities.DESERTNPC, "npc"],
    lavanpc: [Types.Entities.LAVANPC, "npc"],
    
    getType: function(kind) {
        return kinds[Types.getKindAsString(kind)][1];
    }
};

Types.rankedWeapons = [
    Types.Entities.GMHANDLE,
    Types.Entities.DIOPTIONHANDLE,
    Types.Entities.BLUEHANDLE,
    Types.Entities.DIAMONDHANDLE,
    Types.Entities.BLUEHANDLE2,
    Types.Entities.LAMBOHANDLE,
    Types.Entities.MOONSHOTHANDLE
];

Types.rankedArmors = [
    Types.Entities.CLOTHARMOR,
    Types.Entities.LEATHERARMOR,
    Types.Entities.MAILARMOR,
    Types.Entities.PLATEARMOR,
    Types.Entities.GOLDENARMOR,
    Types.Entities.REDARMOR
];

Types.getWeaponRank = function(weaponKind) {
    return _.indexOf(Types.rankedWeapons, weaponKind);
};

Types.getArmorRank = function(armorKind) {
    return _.indexOf(Types.rankedArmors, armorKind);
};

Types.isPlayer = function(kind) {
    return kinds.getType(kind) === "player";
};

Types.isMob = function(kind) {
    return kinds.getType(kind) === "mob";
};

Types.isNpc = function(kind) {
    return kinds.getType(kind) === "npc";
};

Types.isCharacter = function(kind) {
    return Types.isMob(kind) || Types.isNpc(kind) || Types.isPlayer(kind);
};

Types.isArmor = function(kind) {
    return kinds.getType(kind) === "armor";
};

Types.isWeapon = function(kind) {
    return kinds.getType(kind) === "weapon";
};

Types.isObject = function(kind) {
    return kinds.getType(kind) === "object";
};

Types.isChest = function(kind) {
    return kind === Types.Entities.CHEST;
};

Types.isItem = function(kind) {
    return Types.isWeapon(kind) 
        || Types.isArmor(kind) 
        || (Types.isObject(kind) && !Types.isChest(kind));
};

Types.isHealingItem = function(kind) {
    return kind === Types.Entities.ENERGYDRINK 
        || kind === Types.Entities.PIZZA;
};

Types.isExpendableItem = function(kind) {
    return Types.isHealingItem(kind)
        || kind === Types.Entities.REDHERRING
        || kind === Types.Entities.TENDIES;
};

Types.getKindFromString = function(kind) {
    if(kind in kinds) {
        return kinds[kind][0];
    }
};

Types.getKindAsString = function(kind) {
    for(var k in kinds) {
        if(kinds[k][0] === kind) {
            return k;
        }
    }
};

Types.forEachKind = function(callback) {
    for(var k in kinds) {
        callback(kinds[k][0], k);
    }
};

Types.forEachArmor = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isArmor(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.forEachMobOrNpcKind = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isMob(kind) || Types.isNpc(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.forEachArmorKind = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isArmor(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.getOrientationAsString = function(orientation) {
    switch(orientation) {
        case Types.Orientations.LEFT: return "left"; break;
        case Types.Orientations.RIGHT: return "right"; break;
        case Types.Orientations.UP: return "up"; break;
        case Types.Orientations.DOWN: return "down"; break;
    }
};

Types.getRandomItemKind = function(item) {
    var all = _.union(this.rankedWeapons, this.rankedArmors),
        forbidden = [Types.Entities.SWORD1, Types.Entities.CLOTHARMOR],
        itemKinds = _.difference(all, forbidden),
        i = Math.floor(Math.random() * _.size(itemKinds));
    
    return itemKinds[i];
};

Types.getMessageTypeAsString = function(type) {
    var typeName;
    _.each(Types.Messages, function(value, name) {
        if(value === type) {
            typeName = name;
        }
    });
    if(!typeName) {
        typeName = "UNKNOWN";
    }
    return typeName;
};

if(!(typeof exports === 'undefined')) {
    module.exports = Types;
}