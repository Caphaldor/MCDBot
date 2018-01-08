module.exports = {
    description: "Providing the uptime of the current BeeBot 2.0 instance.",
    usage: "-uptime",
    allowedInDM: false,
    allowedChannels: ["274488503243636737"],
    call: function(message, args){
        logging.log("Current Uptime", "BeeBot 2.0 has been up for " +
            "\n" +
            Math.floor(bot.uptime / 86400000) + " days\n" +
            Math.floor(bot.uptime / 3600000 % 24) + " hours\n" +
            Math.floor(bot.uptime / 60000 % 60) + " minutes and\n" +
            Math.floor(bot.uptime / 1000 % 60) + " seconds.", "blue");
    }
};