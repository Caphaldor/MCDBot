module.exports = {
    description: "Command used to say anything in (almost) any channel",
    usage: "-say {Chat} {Message}",
    allowedInDM: false,
    allowedChannels: ["274488503243636737"],
    call: function(message, args){
        if (bot.guilds.get("262699181620068352").channels.find("name", args[0]) != null && config.settings.adminChannels.includes(bot.guilds.get("262699181620068352").channels.find("name", args[0]).id)) {
			message.reply("I'm sorry, but I cannot send a message to that channel");
        }else if (bot.guilds.get("262699181620068352").channels.find("name", args[0]) != null) {
			var channelName = args[0];
			args[0] = " ";
			bot.guilds.get("262699181620068352").channels.find("name", channelName).sendMessage(args.join(' '))
			.catch(function () {
              console.log("Error in posting to the #" + channelName + " channel.");
            });
		}else {
			message.reply("I'm sorry, but I couldn't find #" + args[0]);
		}
    }
};
