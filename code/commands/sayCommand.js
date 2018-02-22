module.exports = {
    description: "Command used to say anything in (almost) any channel",
    usage: "-say {Chat} {Message}",
    allowedInDM: false,
    allowedChannels: [config.settings.logChannelID],
    call: function(message, args){
        if (bot.guilds.get(config.settings.serverID).channels.find("name", args[0]) != null && config.settings.adminChannels.includes(bot.guilds.get(config.settings.serverID).channels.find("name", args[0]).id)) {
			message.reply("I'm sorry, but I cannot send a message to that channel");
        }else if (bot.guilds.get(config.settings.serverID).channels.find("name", args[0]) != null) {
			var channelName = args[0];
			args[0] = " ";
			if (args[1].toLowerCase() == "delete") {
				args[1] = " ";
				message.delete();
			}
			bot.guilds.get(config.settings.serverID).channels.find("name", channelName).sendMessage(args.join(' '))
			.catch(function () {
              console.log("Error in posting to the #" + channelName + " channel.");
            });
		}else {
			message.reply("I'm sorry, but I couldn't find #" + args[0]);
		}
    }
};
