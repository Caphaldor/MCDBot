module.exports = {
    description: "Command used to guess the current challenge.",
    usage: "-say {Chat} {Message}",
    allowedInDM: false,
    allowedChannels: ["274488503243636737"],
    call: function(message, args){
        if (args[0] == "news") {
            args[0] = " ";
            message.delete();
            bot.channels.get("282658419968835595").sendMessage(args.join(' '))
            .catch(function () {
              console.log("Error in posting to the #bots channel.");
            });
        }
        if (args[0] == "bot_logs") {
            args[0] = " ";
            message.delete();
            bot.channels.get("274488503243636737").sendMessage(args.join(' '))
            .catch(function () {
              console.log("Error in posting to the #bots channel.");
            });
        }
        if (args[0] == "dev") {
            args[0] = " ";
            message.delete();
            bot.channels.get("307605282660417537").sendMessage(args.join(' '))
            .catch(function () {
              console.log("Error in posting to the #bots channel.");
            });
        }
        if (args[0] == "helper_chat") {
            args[0] = " ";
            message.delete();
            bot.channels.get("269413408799981568").sendMessage(args.join(' '))
            .catch(function () {
              console.log("Error in posting to the #helper_chat channel.");
            });
        }
        if (args[0] == "general") {
            args[0] = " ";
            message.delete();
            bot.channels.get("269176484248289280").sendMessage(args.join(' '))
            .catch(function () {
              console.log("Error in posting to the #general channel.");
            });
        }
        if (args[0] == "nsfw") {
            args[0] = " ";
            message.delete();
            bot.channels.get("269465956638523395").sendMessage(args.join(' '))
            .catch(function () {
              console.log("Error in posting to the #nsfw channel.");
            });
        }
        if (args[0] == "off_topic") {
            args[0] = " ";
            message.delete();
            bot.channels.get("375265116603809832").sendMessage(args.join(' '))
            .catch(function () {
              console.log("Error in posting to the #spam channel.");
            });
        }
        if (args[0] == "spam") {
            args[0] = " ";
            message.delete();
            bot.channels.get("281725164247449600").sendMessage(args.join(' '))
            .catch(function () {
              console.log("Error in posting to the #spam channel.");
            });
        }
		if (args[0] == "art") {
            args[0] = " ";
            message.delete();
            bot.channels.get("291155962901954561").sendMessage(args.join(' '))
            .catch(function () {
              console.log("Error in posting to the #music channel.");
            });
        }
        if (args[0] == "music") {
            args[0] = " ";
            message.delete();
            bot.channels.get("287253552274079744").sendMessage(args.join(' '))
            .catch(function () {
              console.log("Error in posting to the #music channel.");
            });
        }
        if (args[0] == "builds") {
            args[0] = " ";
            message.delete();
            bot.channels.get("291156022590963712").sendMessage(args.join(' '))
            .catch(function () {
              console.log("Error in posting to the #music channel.");
            });
        }
		if (bot.guilds.get("262699181620068352").channels.find("name", args[0]) != null) {
			logging.legacyLog("Sent message to destination: " + args[0]);
			bot.guilds.get("262699181620068352").channels.find("name", args[0]).sendMessage(args.join(' '));
		}
    }
};
