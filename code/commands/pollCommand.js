function addSimpleReactions(message) {
    message.react(message.guild.emojis.get("303100818041733120")).catch(function () {
        logging.legacyLog("Fatal Error in adding agree rating.");
    });
   setTimeout(function() {message.react(message.guild.emojis.get("303100826434404362")).catch(function () {
        logging.legacyLog("Fatal Error in adding disagree rating.");
    })}, 1000);
    //timeout exists so that agree is always before disagree
}
function addComplexReactions(message, options) {
    message.react(message.guild.emojis.get("303100818041733120")).catch(function () {
        logging.legacyLog("Fatal Error in adding agree rating.");
    });
}
function findSeparators(inputArray) {
    var separatorPositions = [],j=0;
    for (i = 0; i<inputArray.length;i++) {
        if (inputArray[i] == "|") {
            separatorPositions[j] = i;
            j++;
        }
    }
    return separatorPositions
}
module.exports = {
    description: "Command used to create polls",
    usage: "-polls",
    allowedInDM: false,
    allowedChannels: ["274488503243636737"],
    call: function(message, args){
        if (!args.includes("|")) {
            bot.channels.get(config.settings.pollChannelID).send(
                "",{embed: embed("Poll from " + message.author.username,args.join(" "), "gold")}
            ).then(msg => addSimpleReactions(msg));
        } else {
            var separators = findSeparators(args);
            bot.channels.get(config.settings.pollChannelID).send(
                "",{embed: embed("Poll from " + message.author.username,"found " + separators.length + " separators, first after " + args[separators[0]] , "gold")}
            ).then(msg => addComplexReactions(msg));
        }
    }
};