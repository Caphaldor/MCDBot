module.exports = {
    description: "Provides help for all public BeeBot 2.0 commands",
    usage: "-help command",
    allowedInDM: true,
    allowedChannels: ["Cookies","and","spice","and","everything","nice"],
    call: function(message, args){
        //turning all available commands into an object
        const command = require("./commands.js");
        var commands = Object.keys(command).map(function(c) {
            var description = command[c].description;
            var usage = command[c].usage;
            var DMAllowance = command[c].allowedInDM;
            var otherChannels = command[c].allowedChannels;
            return [c, description, usage, DMAllowance, otherChannels];
        });
        message.reply(commands);
    }
};
