define(['text!../config/project.json'], function(projectJson) {
    var defaults = {
        projectName: "MEMECOIN QUEST",
        tokenName: "MemeCoin",
        tokenSymbol: "MEME",
        contractAddress: "COMING_SOON",
        website: "https://yourproject.com",
        twitter: "https://x.com/yourproject",
        telegram: "https://t.me/yourproject",
        logo: "img/common/favicon.png",
        description: "Explore the PumpVerse, hunt legendary tokens, and become the ultimate Crypto Hunter."
    };

    try {
        return _.extend({}, defaults, JSON.parse(projectJson));
    } catch(e) {
        return defaults;
    }
});
