module.exports = {
    description: "Command used to create polls",
    usage: "-polls",
    allowedInDM: false,
    allowedChannels: ["274488503243636737"],
    call: function(message, args){
        if (!args.includes("|")) {
            bot.channels.get(config.settings.pollChannelID).send(
                "Detected a yes or no question"
            ).then(msg =>
                msg.react(message.guild.emojis.get("303100818041733120")).catch(function () {
                    logging.legacyLog("Fatal Error in adding agree rating.");
                })).then(
               setTimeout(function() {msg.react(message.guild.emojis.get("303100826434404362")).catch(function () {
                    logging.legacyLog("Fatal Error in adding disagree rating.");
                })}, 1000)
            );
        } else {
            bot.channels.get(config.settings.pollChannelID).send(
                "",{embed: embed("` `","Just testing embeds", "gold")}
            );
        }
    }
};