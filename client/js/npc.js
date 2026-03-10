
define(['character'], function(Character) {

    var NpcTalk = {
        "guard": [
            "Yo, what's good?",
            "Just HODL your keys, don't lose them",
            "You don't look like a paper hand to me",
            "Keep grinding, keep stacking..."
        ],
    
        "king": [
            "I'm the Doge King",
            "I run the Memecoin Universe",
            "Much power",
            "I influence the masses",
            "Much control",
            "I wear a golden memecap",
            "Such prestige",
            "I pump bags all day",
            "Much profit",
            "Now leave me alone",
            "Much busy"
        ],
    
        "villagegirl": [
            "WAGMI, crypto explorer!",
            "How are you liking the Memecoin Universe?",
            "It's all running on a decentralized web page! Isn't it wild?",
            "It's made possible thanks to peer-to-peer connections.",
            "I'm just a digital entity trading memes and dreams.",
            'Check out <a target="_blank" href="https://memecoin.universe/">the Memecoin docs</a> to learn about the metaverse!'
        ],
    
        "villager": [
            "Yo, anon. You like shitposting?",
            "Doge is love, Pepe is memes...",
            "I like grinding normies, and so should you...",
            "The normies are rekt, now what to do?",
            "To be honest, just HODL and chill.",
            "Maybe the Lava Zone could interest you...",
            "or instead, stake your tendies."
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
            "HODL, young traveler.",
            "Memecoin wisdom is everything, so I'll share a few HODLing tips with you.",
            "You are free to farm and explore the Memecoin Universe",
            "but beware of the many FUDsters and rug pullers that await you.",
            "You can find many dope weapons and hoddies by defeating the normies.",
            "The stronger the enemy, the better the loot you'll receive.",
            "You can also unlock achievements by exploring and grinding.",
            "Click on the moon icon to see a list of all the achievements.",
            "Please stay a while and enjoy the many memes of Memecoin Universe",
            "To the moon, friend."
        ],
        
        "sorcerer": [
            "Ah... I predicted you would come seek me out.",
            "Well? How do you like my new lambo handle?",
            "Pretty sick, yeah?",
            "Where did I score it, you wonder?",
            "I feel you. It's easy to get FOMO.",
            "I actually farmed it myself, using my elite shitposting skills.",
            "But let me tell you something real...",
            "There are tons of loot in the Memecoin Universe.",
            "Some way more valuable than others.",
            "To find them, you gotta grind and explore.",
            "Get those bags."
        ],
        
        "octocat": [
            "Welcome to Memecoin Universe!",
            "Want to see the source code?",
            'Check out <a target="_blank" href="http://github.com/mozilla/BrowserQuest">the Memecoin GitHub</a>'
        ],
        
        "coder": [
            "Yo! You can play Memecoin Universe on any device with a browser!",
            "That's the power of blockchain and web3!",
            "Get trading, anon..."
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