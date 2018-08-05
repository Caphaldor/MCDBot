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
    for (i = 0; i<(inputArray.length-1);i++) {
        if (inputArray[i] == "|") {
            separatorPositions[j] = i;
            j++;
            i++;
        }
    }
    return separatorPositions
}
//checks for deletion in case not in DM
function checkDM(msg, DM, div) {
    if (DM != "dm") {
        msg.delete(30000/div);
    }
};
module.exports = {
    description: "The command will create a poll in #polls, do `-poll help` for more information.",
    usage: "-poll {PolL Message} [\"| {Poll answer 1} | { Poll Answer 2} | [etc.]\"]",
    allowedInDM: false,
    allowedChannels: ["281725164247449600"],
    call: function(message, args){
        if (!args.includes("|")) {
            var response = args.join(" ");
            if (!(response.replace(/\s+/g,""))) {
                message.reply("",{embed: embed("Error","Is it just me, or did you forget to put a question in your poll?", "red")}).then(msg => checkDM(msg, message.channel.type, 1));;
            } else if (response == "help"){
                message.delete();
                 message.reply("",{embed: embed("`-poll` Help","Doing `-poll {Question}` will create a simple \"Yes\" or \"No\" poll. You can create custom answers for your poll by adding `| Answer A | Answer B | Answer C` etc. at the end. For example:\nDoing `-poll Is this guide helpful?` Will create the poll and automatically add <:agree:303100818041733120> and <:disagree:303100826434404362> to it.\nDoing `-poll Is this guide helpful? | Yes | Maybe | No` will create the very same poll, but will associate each of the provided answers with 🇦, 🇧 and 🇨 respectively.\n\n*Do note that you need a space before and after the `|`, as well as actual answers and not empty space in-between them, otherwise it will be seen as a character in your question/answer.*", "white")}).then(msg => checkDM(msg, message.channel.type, 1));;
            } else {
            bot.channels.get(config.settings.pollChannelID).send(
                "",{embed: embed("Poll from " + message.author.username,response, "pink")}
            ).then(msg => addSimpleReactions(msg));
            }
        } else {
            var separators = findSeparators(args),response="";
            if (separators.length<2 || separators.length>20) {
                message.reply("",{embed: embed("Error","You have provided an invalid number of options.\nI need at least 2 and no more than 20.", "red")}).then(msg => checkDM(msg, message.channel.type, 1));;
            } else {
            separators.push(args.length);
            for (i=0;i<separators[0];i++) {
                response += args[i] + " ";
            }
            if (!(response.replace(/\s+/g,""))) {
                message.reply("",{embed: embed("Error","Is it just me, or did you forget to put a question in your poll?", "red")}).then(msg => checkDM(msg, message.channel.type, 1));;
            } else {
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
            }}
        }
    }
};