module.exports = {
    description: "Provides information on the current BeeBot 2.0 instance.",
    usage: "-info",
    allowedInDM: false,
    allowedChannels: ["274488503243636737"],
    call: function(message, args){
        logging.log("Bot information", "BeeBot 2.0 has been up for " +
            "\n" +
            Math.floor(bot.uptime / 86400000) + " days\n" +
            Math.floor(bot.uptime / 3600000 % 24) + " hours\n" +
            Math.floor(bot.uptime / 60000 % 60) + " minutes and\n" +
            Math.floor(bot.uptime / 1000 % 60) + " seconds.\n" +
            "**Current Bot Version:** " + botInfo.version + "\n" +
            "**Bot License:** " + botInfo.license, "blue");
    }
};