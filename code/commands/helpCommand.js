module.exports = {
    description: "Provides help for all public BeeBot 2.0 commands",
    usage: "-help command",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        //turning all available commands into an object
        const command = require("./commands.js");
        var commands = Object.keys(command);
        message.reply(commands);
    }
};
