module.exports = {
    description: "Provides help for all public BeeBot 2.0 commands",
    usage: "-help command",
    allowedInDM: true,
    allowedChannels: ["Cookies","and","spice","and","everything","nice"],
    call: function(message, args){
        //turning all available commands into an object
        const command = require("./commands.js");
        var channels = [];
        var commands = Object.keys(command).map(function(c) {
            var description = command[c].description;
            var usage = command[c].usage;
            var DMAllowance = command[c].allowedInDM;
            channels[c] = command[c].allowedChannels;
            return [c, description, usage, DMAllowance, "\n"];
        }).sort(function(a,b){
            if(a[0] < b[0]) return -1;
            if(a[0] > b[0]) return 1;
            return 0;
        });
        if (message.channel.type=="dm") {
        //commands[c] requires number not name
            var availableCommands = Object.keys(command).map(function(c) {
                for (i=0; i<commands.length;i++) {
                    if (commands[i][0]==c && commands[i][3] && !(c=="ldb"||c=="leaderboard")) {return[c, commands[i][1], commands[i][2], "\n"];}
                }
            });
            for (i=availableCommands.length-1;i>=0;i--) {
                if (!availableCommands[i]) {availableCommands.splice(i,1);}
            }
            var pageEntries = 8;
            if (args[0] == undefined || isNaN(args[0])) {
                var listPage = 1;
            } else if (args[0] > Math.ceil(availableCommands.length/pageEntries)) {
                var listPage = Math.ceil(availableCommands.length/pageEntries);
            } else {
                var listPage = parseInt(args[0]);
            }
            var messageFields = [];
            var fieldNum=0;
            for (i=(listPage*pageEntries-pageEntries); i<listPage*pageEntries && i<availableCommands.length; i++) {
                messageFields[fieldNum] = {
                    "name": "`" + availableCommands[i][2] + "`",
                    "value": availableCommands[i][1]
                };
                fieldNum++;
            }
            if (listPage*pageEntries<availableCommands.length) {
                messageFields[fieldNum] = {
                    "name": "` `",
                    "value": "\nUse `-help " + (listPage+1) + "` for the next page."
                }
            }
            message.reply("",
                {
                    embed: {
                    "color": 0xc1f1ff,
                    "fields": messageFields
                    }
                }
            );
        }
    }
};
