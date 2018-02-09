module.exports = {
    description: "All voice channel related commands",
    usage: "-voice",
    allowedInDM: false,
    allowedChannels: ["274488503243636737","281725164247449600","285168563076071424"],
    call: function(message, args){
        if (args[0] == "send") {
            bot.channels.get("285398540266635265").join().then(connection =>
              logging.log("Channel joined","Channel was succesfully joined", "blue")).catch(function () {
                console.log("Error in joining the Event channel.");
              });
        }
        if (args[0] == "create") {
          if(!channels.hasChannel(message.author.id)) {
            var channelName = "";
            if(args.length >= 2) {
                for(var i = 1; i < args.length; i++) {
                  channelName += args[i] + " ";
                }
            } else if(args.length == 1) {
                channelName = message.author.username + "'s Channel";
            }

            if(!filter(channelName)) {
              message.guild.createChannel(
                  name: channelName,
                  type: "voice"
              ).then(function(channel) {
                  console.log("Channel created");
                  channels.createChannel(message.author.id, message.author.username, channel.id, channel.name);

                  logging.log("Channel creation",
                  "`" + channel.name + "` was succesfully created for " + message.author.username, //+ ", channel ID is " + channel.id,
                  "blue");

                  message.reply("", {embed: embed("Channel created",
                  "Your channel, `" + channel.name + "` was succesfully created. Enjoy!", //+ ", channel ID is " + channel.id,
                  "blue")});

                  bot.guilds.get("262699181620068352").moveMember(message.id, bot.guilds.get("262699181620068352"), channel.id, function(error){})
                  .then()
                  .catch(function() {
                    console.log("Error moving user to channel.");
                    message.reply("",{embed: embed("Couldn't join channel", "We tried to move you to the channel, but something went wrong.\n\nAre you connected to a voice channel?\nIf not, you should probably do that.", "red")});
                  });
              })
              .catch(function () {
                  console.log("Error in creating channel.");
              });
            } else {
                message.reply("",{embed: embed("Couldn't create channel", "Please do not use offensive language in your channel name.", "red")});
            }
          } else {
              message.reply("",{embed: embed("Couldn't create channel", "You already have a channel!", "red")});
          }
        }
        if (args[0] == "channels") {
            for(var channelsVariable in config.customChannels) {
              var channelsJSON = JSON.parse(channelsVariable);
              console.log(channelsVariable);
              console.log(channelsJSON.name);
              console.log(channelsJSON.createdTimestamp);
            }
        }
        if (args[0] == "private") {
          if(!channels.hasChannel(message.author.id)) {
            var channelName = "";
            if(args.length >= 2) {
                for(var i = 1; i < args.length; i++) {
                  channelName += args[i] + " ";
                }
            } else if(args.length == 1) {
                channelName = message.author.username + "'s Private Channel";
            }

            if(!filter(channelName)) {
              bot.guilds.get("262699181620068352").createChannel(
                  channelName,
                  "voice",
                  false
              ).then(function(channel) {
                  channels.createPrivateChannel(message.author.id, message.author.username, channel.id, channel.name, [message.author.id]);

                  logging.log("Private channel creation",
                  "`" + channel.name + "` [Private] was succesfully created for " + message.author.username, //+ ", channel ID is " + channel.id,
                  "blue");

                  message.reply("", {embed: embed("Channel created",
                  "Your private channel, `" + channel.name + "` was succesfully created. Enjoy!\n"
                  + "To allow users into the channel, reply with -voice invite <@user>",
                  "blue")});

                  bot.guilds.get("262699181620068352").moveMember(message.id, bot.guilds.get("262699181620068352"), channel.id, function(error){})
                  .then()
                  .catch(function() {
                    console.log("Error moving user to channel.");
                    message.reply("",{embed: embed("Couldn't join channel", "We tried to move you to the channel, but something went wrong.\n\nAre you connected to a voice channel?\nIf not, you should probably do that.", "red")});
                  });
              })
              .catch(function () {
                  console.log("Error in creating channel.");
              });
            } else {
                message.reply("",{embed: embed("Couldn't create channel", "Please do not use offensive language in your channel name.", "red")});
            }
          } else {
              message.reply("",{embed: embed("Couldn't create channel", "You already have a channel!", "red")});
          }
        }
    }
};
