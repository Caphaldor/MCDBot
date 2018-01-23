//import libraries

//config
config = require("./config.json");
//discord library
const dc = require("discord.js");
//minecraft protocol handler
const mc = require("minecraft-protocol");
//web request library
req = require("request");
//utility module for Embeds in discord (self-written)
embed = require("./util/embed.js");
filter = require("./util/filter.js");
channels = require("./util/channels.js");

//secureConfig
const secureConfig = require("./secureConfig.json");

//commands
const command = require("./commands/commands.js");
//fs
const fs = require("fs");


//creating discord client
bot = new dc.Client();

logging = require("./logging.js");

//list with tokens
list = new Map();

//starting MC server
const server = mc.createServer({
    "online-mode": true,
    encryption: true,
    port: 25565,
    version: "1.12.1"
});

//Log to Console: Startup
console.log("Starting up...");

//Auto-message on join
bot.on('guildMemberAdd', function(member){
    member.sendMessage("Welcome to The Hive's Community Discord! I am BeeBot, and I am here to help you verify!\n"+
                               "Verifying will grant you access to our text and voice channels, so you can talk with everyone! To do it, just follow these simple steps:\n" +
                               "**1.)** Launch Minecraft __**1.12.1**__, and use Direct Connect in the Multiplayer menu to join `caphaldor.com`. You will be kicked with a Token.\n" +
                               "**2.)** Send me a message saying `-token YOUR_TOKEN`.\n\n" +
                               "And that's it! You should now have your rank, enjoy your stay!\n" +
                               "*If you run into any problems, don't hesitate to ask for help in `#getting_started`!*");
});
//Ready event
bot.on("ready", function () {
    //Log to Console: Startup done
    console.log("Discord ready, starting up done!");
    //Log to chat: Startup done
    logging.log("Bot started", "Discord is online, Minecraft Server online at verify.thtmx.rocks:25565", "blue");
});

bot.on("reconnecting", function () {
    console.log("Reconnecting to discord NOW.");
});
bot.on("warn", function (w) {
    console.log("WARNING: " + w);
});
bot.on("error", function (e) {
    console.log("Error: " + e);
});
bot.on("disconnect", function (cE) {
    console.log("Connection closed, this is more information: ");
    console.log(cE);
});
bot.on("debug", function (d) {
    //console.log("Debug: " + d);
});

bot.on("voiceStateUpdate", function(data) {
    console.log("Voice update:");
    console.log(data);

    if(data.voiceChannelID != null && channels.isCustomChannel(data.voiceChannelID)) {
    var channelID = config.customChannels[data.voiceChannelID].channelID;
    var channelName = config.customChannels[data.voiceChannelID].name;
    var user = config.customChannels[data.voiceChannelID].created[0];
    var userName = config.customChannels[data.voiceChannelID].created[1];

    //console.log("DEBUG: voiceStateUpdate called for #" + channelID + ", namely " + channelName + " (created by #" + user.id + ", namely " + userName + ")");
    var channel = bot.channels.get(channelID);
    if(channel.members.array().length == 0) {
      channel.delete()
        .then(function() {
          user.sendMessage("We've deleted your custom channel, " + channelName + ", because nobody was using it. 👍");
          logging.log("Custom channel deleted",
          "Channel ID: " + channelID + "\n" +
          "Channel Name: " + channelName + "\n" +
          "This channel was created by #" + channelList.get(data.voiceChannelID)[1] + " (" + userName + ")", "blue");

          channels.removeChannel(channelID);
        })
        .catch(function (error) {
          console.log("Error in deleting channel");
          console.log(error);
        });
    }
  }
});

//on message event
bot.on("message", function (message) {
    //exit if the message was sent by a bot or there is no guild-user sending it (i.e. the user is not part of the community discord)
    if ((message.author.bot) || (bot.guilds.get("262699181620068352").members.get(message.author.id) == undefined)) return;
    if (filter(message.content, "cunt") && message.channel.type != "dm" && !config.filter.exemptedChannels.includes(message.channel.id)){
        logging.log("Abusive Chat", "User: " + message.author.username + "\nMessage: " + message.content + "\nChannel: " + message.channel.name, "gold", "rulebreakers");
        message.delete();
        message.author.sendMessage("We just deleted one of your messages. Please stay appropriate. Further violation" +
            " of the rules results in punishments!");
    }
	//Anti-suicide talk for doc (special notification)
	if (message.channel.id=="291155962901954561" && message.author.id=="209441455595454464" && message.content.toLowerCase().includes("suicide")) {
	    message.author.sendMessage("Hey doc, I'd just like to remind you that if you'd like to talk about suicide, #art is not a place for this and you should use #off_topic instead. Have a great day and stay strong <3");
    }
	//Currently commented out, reminder to use @Moderator when reporting hackers
	//if (message.channel.id == "262703814535020554" && !message.isMentioned("291117656306876417") && filter(message.content, "mod") && (message.member.roles.get("262707342783545344") == undefined) && (message.member.roles.get("262708985767919616") == undefined) && (message.member.roles.get("262709499331084290") == undefined) && (message.member.roles.get("262709291520098304") == undefined)) {
    //    message.reply("I believe you forgot to do " + message.guild.roles.get("291117656306876417") + ", so I'll do it for you. In the future, please use the mention to notify mods of any reports :)").then(msg.delete(16000));
    //}
    //check to see what the message starts with
    var starter = message.content.substr(0, 1);
    if(starter == "-" || starter == "/") {
      message.content = message.content.substr(1);
      var msgParts = message.content.split(" ");
      var commandIdentifier = msgParts[0];
      msgParts.splice(0,1);
      var commands = Object.keys(command);
      if( (commands.includes(commandIdentifier)) && ( ( (message.channel.type == "dm") && (command[commandIdentifier].allowedInDM) ) || (command[commandIdentifier].allowedChannels.includes(message.channel.id) ) ) ){
          command[commandIdentifier].call(message, msgParts);
      }
    }

    else if (message.channel.type == "dm"){
        message.reply("Hello " + message.author.username + ", I am your friendly BeeBot, what can I do for you today?" +
            "\nIf you would like to verify your account, use \"-verify\". This is required for access to the Unofficial Discord" +
            "\nYou can also get stats of players on the Hive, simply use \"-stats\" for more information (this also works in #spam)" +
            "\nIf you think you have what it takes to find my secrets, type \"-hint\" to get a hint, " +
            "and if you think you have an idea what the secret word is, do \"-guess WORD\"");
    }
    //#discord_suggestions auto-reaction system
    if(message.channel.id == "262725943951491072" && message.author.id != "155963500265603072"){
        message.react(message.guild.emojis.get("303100818041733120")).catch(function () {
            logging.legacyLog("Fatal Error in adding agree rating.");
        });
       setTimeout(function() {message.react(message.guild.emojis.get("303100826434404362")).catch(function () {
            logging.legacyLog("Fatal Error in adding disagree rating.");
        })}, 1000);
        //timeout exists so that 👍 is always before 👎
    }
});

//when someone logins to the server successfully
server.on("login", function (client) {

    //current time
    var time = Date.now();
    //generate random token
    var token = Math.floor((Math.random() * 20000) + 1234);
    //getting the client's UUID
    var uuid = client.uuid;
    //add them to our global list
    list.set(token, [time, uuid]);
    //immediately stop the connection to the client, telling them the reason
    client.end("This is your token: §a" + token + "\n\n§4 DO NOT SHARE THIS WITH *ANYONE*!");

});
server.on("error", function (e) {
    console.log(e);
});
server.on("connection", function (client) {
    client.on("error", function () {
        //console.log("Client received a legacy ping. Prevented the crash.");
    });
});

// login the bot, as soon as all events and functions are registered
bot.login(secureConfig.token);
