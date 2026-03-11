
define(['character'], function(Character) {

    var NpcTalk = {
        "guard": [
            "Yo, what's good?",
            "Just HODL your keys, don't lose them",
            "You don't look like a paper hand to me",
            "Keep grinding, keep stacking..."
        ],
    
        "king": [
            "I'm the Whale King",
            "I rule the PumpVerse",
            "Much power",
            "I influence the markets",
            "Such control",
            "I wear a golden crown",
            "Much prestige",
            "I pump legendary tokens",
            "Such profit",
            "Now leave me alone",
            "Much busy"
        ],
    
        "villagegirl": [
            "WAGMI, Crypto Hunter!",
            "How are you liking the PumpVerse?",
            "It's all running on a decentralized web page! Isn't it wild?",
            "It's made possible thanks to peer-to-peer connections.",
            "I'm just a digital entity trading memes and dreams.",
            "Keep hunting for legendary tokens and building your market score!"
        ],
    
        "villager": [
            "Yo, Hunter! Looking for some action?",
            "Doge is love, Pepe is memes...",
            "I like hunting enemies, and so should you...",
            "Defeat them and collect those fragments!",
            "To be honest, just HODL and chill.",
            "Maybe the Market Citadel could interest you...",
            "or instead, collect more token fragments."
        ],
    
        "agent": [
            "Do not try to bend the sword",
            "That's impossible",
            "Instead, only try to realize the truth...",
            "There is no sword."
        ],
    
        "rick": [
            "We're no strangers to love",
            "You know the rules and so do I",
            "A full commitment's what I'm thinking of",
            "You wouldn't get this from any other guy",
            "I just wanna tell you how I'm feeling",
            "Gotta make you understand",
            "Never gonna give you up",
            "Never gonna let you down",
            "Never gonna run around and desert you",
            "Never gonna make you cry",
            "Never gonna say goodbye",
            "Never gonna tell a lie and hurt you"
        ],
        
        "scientist": [
            "Yo, degenerates.",
            "I've concocted these two legendary draughts.",
            "The red energy drink will restore your health...",
            "The orange moon juice will turn you into a shitposting god and make you unstoppable...",
            "But the effect only lasts for a brief moment.",
            "So use it wisely on your enemies!",
            "Now if you'll excuse me, I gotta get back to testing my moon rockets..."
        ],
    
        "nyan": [
            "nyan nyan nyan nyan nyan",
            "nyan nyan nyan nyan nyan nyan nyan",
            "nyan nyan nyan nyan nyan nyan",
            "nyan nyan nyan nyan nyan nyan nyan nyan"
        ],
        
        "beachnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],
        
        "forestnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],
        
        "desertnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],
        
        "lavanpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],
    
        "priest": [
            "HODL, young Hunter.",
            "PumpVerse wisdom is everything, so I'll share a few HODLing tips with you.",
            "You are free to farm and explore the PumpVerse",
            "but beware of the many FUDsters and rug pullers that await you.",
            "You can find many dope weapons and armor by defeating enemies.",
            "The stronger the enemy, the better the loot you'll receive.",
            "You can also unlock achievements by exploring and grinding.",
            "Click on the moon icon to see a list of all the achievements.",
            "Please stay a while and enjoy hunting legendary tokens in PumpQuest",
            "To the moon, Hunter!"
        ],
        
        "sorcerer": [
            "Ah... I predicted you would come seek me out.",
            "Well? How do you like my new lambo blade?",
            "Pretty sick, yeah?",
            "Where did I score it, you wonder?",
            "I feel you. It's easy to get FOMO.",
            "I actually farmed it myself, using my elite trading skills.",
            "But let me tell you something real...",
            "There are tons of legendary tokens in the PumpVerse.",
            "Some way more valuable than others.",
            "To find them, you gotta grind and explore.",
            "Get those fragments."
        ],
        
        "octocat": [
            "Welcome to PumpQuest!",
            "Hunting for legendary tokens?",
            "Keep grinding and exploring the PumpVerse to level up!"
        ],
        
        "coder": [
            "Yo! You can play PumpQuest on any device with a browser!",
            "That's the power of blockchain and web3!",
            "Keep hunting, Crypto Hunter!"
        ],
    
        "beachnpc": [
            "Yo, I'm just vibing here on my moon vacation.",
            "Ngl...",
            "These Chad mobs are kinda cringe.",
            "Can you please send them to the shadow realm?"
        ],
        
        "desertnpc": [
            "Welcome to the Wasteland of Forgotten Memes...",
            "A legendary FUD Lord dwells somewhere out here.",
            "They say he controls the price with a single tweet...",
            "...but traders who met him never profited again.",
            "Maybe grab some tendies and pump some bags instead?"
        ],
    
        "othernpc": [
            "lorem ipsum",
            "lorem ipsum"
        ]
    };

    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);
            this.talkCount = NpcTalk[this.itemKind].length;
            this.talkIndex = 0;
        },
    
        talk: function() {
            var msg = null;
        
            if(this.talkIndex > this.talkCount) {
                this.talkIndex = 0;
            }
            if(this.talkIndex < this.talkCount) {
                msg = NpcTalk[this.itemKind][this.talkIndex];
            }
            this.talkIndex += 1;
            
            return msg;
        }
    });
    
    return Npc;
});