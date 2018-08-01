function addSimpleReactions(message) {
    message.react(message.guild.emojis.get("303100818041733120")).catch(function () {
        logging.legacyLog("Fatal Error in adding agree rating.");
    });
   setTimeout(function() {message.react(message.guild.emojis.get("303100826434404362")).catch(function () {
        logging.legacyLog("Fatal Error in adding disagree rating.");
    })}, 1000);
    //timeout exists so that agree is always before disagree
}
function addComplexReactions(message, amount) {
    message.react(message.guild.emojis.get("474283452934651914")).catch(function () {
        logging.legacyLog("Fatal Error in adding A rating.");
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
            var separators = findSeparators(args),response="";
            separators.push(args.length);
            for (i=0;i<separators[0];i++) {
                response += args[i] + " ";
            }
            for (i=0;i<(separators.length-1);i++) {
                var temp = "";
                for (j=(separators[i]+1);j<separators[i+1];j++) {
                    temp += args[j] + " ";
                }
                response += "\n" + settings.emojiCodes[i] + " - " + temp;
            }
            bot.channels.get(config.settings.pollChannelID).send(
                "",{embed: embed("Poll from " + message.author.username,"found " + separators.length + " separators, first after " + args[separators[0]-1] + response , "gold")}
            ).then(msg => addComplexReactions(msg,(separators.length-2)));
        }
    }
};