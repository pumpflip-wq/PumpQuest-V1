
define(function() {

    var Storage = Class.extend({
        init: function() {
            if(this.hasLocalStorage() && localStorage.data) {
                this.data = JSON.parse(localStorage.data);
                if(this.data.marketScore === undefined) {
                    this.data.marketScore = 0;
                }
                if(!this.data.leaderboard) {
                    this.data.leaderboard = [];
                }
            } else {
                this.resetData();
            }
        },
    
        resetData: function() {
            this.data = {
                hasAlreadyPlayed: false,
                player: {
                    name: "",
                    weapon: "",
                    armor: "",
                    image: ""
                },
                achievements: {
                    unlocked: [],
                    ratCount: 0,
                    skeletonCount: 0,
                    totalKills: 0,
                    totalDmg: 0,
                    totalRevives: 0
                },
                marketScore: 0,
                leaderboard: [],
                fragmentsCollected: 0,
                enemies: {
                    defeated: 0
                }
            };
        },
    
        hasLocalStorage: function() {
            return Modernizr.localstorage;
        },
    
        save: function() {
            if(this.hasLocalStorage()) {
                localStorage.data = JSON.stringify(this.data);
            }
        },
    
        clear: function() {
            if(this.hasLocalStorage()) {
                localStorage.data = "";
                this.resetData();
            }
        },
    
        // Player
    
        hasAlreadyPlayed: function() {
            return this.data.hasAlreadyPlayed;
        },
    
        initPlayer: function(name) {
            this.data.hasAlreadyPlayed = true;
            this.setPlayerName(name);
        },
        
        setPlayerName: function(name) {
            this.data.player.name = name;
            this.save();
        },
    
        setPlayerImage: function(img) {
            this.data.player.image = img;
            this.save();
        },

        setPlayerArmor: function(armor) {
            this.data.player.armor = armor;
            this.save();
        },
    
        setPlayerWeapon: function(weapon) {
            this.data.player.weapon = weapon;
            this.save();
        },

        savePlayer: function(img, armor, weapon) {
            this.setPlayerImage(img);
            this.setPlayerArmor(armor);
            this.setPlayerWeapon(weapon);
        },
    
        // Achievements
    
        hasUnlockedAchievement: function(id) {
            return _.include(this.data.achievements.unlocked, id);
        },
    
        unlockAchievement: function(id) {
            if(!this.hasUnlockedAchievement(id)) {
                this.data.achievements.unlocked.push(id);
                this.save();
                return true;
            }
            return false;
        },
    
        getAchievementCount: function() {
            return _.size(this.data.achievements.unlocked);
        },
    
        // Angry rats
        getRatCount: function() {
            return this.data.achievements.ratCount;
        },
    
        incrementRatCount: function() {
            if(this.data.achievements.ratCount < 10) {
                this.data.achievements.ratCount++;
                this.save();
            }
        },
        
        // Skull Collector
        getSkeletonCount: function() {
            return this.data.achievements.skeletonCount;
        },

        incrementSkeletonCount: function() {
            if(this.data.achievements.skeletonCount < 10) {
                this.data.achievements.skeletonCount++;
                this.save();
            }
        },
    
        // Meatshield
        getTotalDamageTaken: function() {
            return this.data.achievements.totalDmg;
        },
    
        addDamage: function(damage) {
            if(this.data.achievements.totalDmg < 5000) {
                this.data.achievements.totalDmg += damage;
                this.save();
            }
        },
        
        // Hunter
        getTotalKills: function() {
            return this.data.achievements.totalKills;
        },

        incrementTotalKills: function() {
            if(this.data.achievements.totalKills < 50) {
                this.data.achievements.totalKills++;
                this.save();
            }
        },
    
        // Still Alive
        getTotalRevives: function() {
            return this.data.achievements.totalRevives;
        },
    
        incrementRevives: function() {
            if(this.data.achievements.totalRevives < 5) {
                this.data.achievements.totalRevives++;
                this.save();
            }
        },

        getMarketScore: function() {
            return this.data.marketScore || 0;
        },

        setMarketScore: function(score) {
            this.data.marketScore = score;
            this.save();
        },

        addMarketScore: function(points) {
            this.setMarketScore(this.getMarketScore() + points);
        },

        getLeaderboard: function() {
            return this.data.leaderboard || [];
        },

        setLeaderboard: function(entries) {
            this.data.leaderboard = entries;
            this.save();
        },

        getFragmentsCollected: function() {
            return this.data.fragmentsCollected || 0;
        },

        addFragment: function() {
            if(!this.data.fragmentsCollected) {
                this.data.fragmentsCollected = 0;
            }
            this.data.fragmentsCollected++;
            this.save();
        },

        getEnemiesDefeated: function() {
            return (this.data.enemies && this.data.enemies.defeated) || 0;
        },

        incrementEnemiesDefeated: function() {
            if(!this.data.enemies) {
                this.data.enemies = { defeated: 0 };
            }
            this.data.enemies.defeated++;
            this.save();
        }
    });
    
    return Storage;
});
