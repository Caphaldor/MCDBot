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
    var i=0;
    var reactor = setInterval(function() {
        if (i>=amount) {clearInterval(reactor)}
        message.react(config.emojiCodes[i]).catch(function () {
            logging.legacyLog("Fatal Error in adding a reaction.");
        });
        i++;
    }, 500);
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
    allowedChannels: ["281725164247449600"],
    call: function(message, args){
        if (!args.includes("|")) {
            bot.channels.get(config.settings.pollChannelID).send(
                "",{embed: embed("Poll from " + message.author.username,args.join(" "), "pink")}
            ).then(msg => addSimpleReactions(msg));
        } else {
            var separators = findSeparators(args),response="";
            if (separators.length<2 || separators.length>20) {
                message.reply("",{embed: embed("Error","You have provided an invalid number of options.\nI need at least 2 and no more than 20.", "red")}).then(msg => checkDM(msg, message.channel.type, divN));;
            } else {
            separators.push(args.length);
            for (i=0;i<separators[0];i++) {
                response += args[i] + " ";
            }
            for (i=0;i<(separators.length-1);i++) {
                var temp = "";
                for (j=(separators[i]+1);j<separators[i+1];j++) {
                    temp += args[j] + " ";
                }
                response += "\n" + config.emojiCodes[i] + " - " + temp;
            }
            bot.channels.get(config.settings.pollChannelID).send(
                "",{embed: embed("Poll from " + message.author.username, response, "pink")}
            ).then(msg => addComplexReactions(msg,(separators.length-2)));
            }
        }
    }
};