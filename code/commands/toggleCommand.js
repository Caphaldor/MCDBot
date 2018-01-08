module.exports = {
    description: "Toggles notifications recieved from @Moderator.",
    usage: "-toggle",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args) {
        var user = bot.guilds.get("262699181620068352").members.get(message.author.id);
        if ((user.roles.get("262707342783545344") != undefined || user.roles.get("269414839091331072") != undefined) && (args[0].toLowerCase() == "moderator" || args[0].toLowerCase() == "mod")) {
            if (user.roles.get("291117656306876417") == undefined) {
                message.reply("Your @Moderator notifications have been toggled ON");
                user.addRole("291117656306876417").then(function() {
                    logging.log("Notification toggle", "Toggled notifications ON for "+ message.author.username, "green")
                }).catch(function() {
                    console.log("Error in toggling Moderator notifications. Adding role didn't work");
                    message.reply("Uh oh, something went wrong. I have notified the HUD Dev team and they will look into it shortly.");
                    logging.legacyLog("Something broke whilst trying to add Notifications for " + messag.author.username + ".\n<@155963500265603072> <@98153298237857792> <@142314965695594496>");
                });
            } else {
                message.reply("Your @Moderator notifications have been toggled OFF");
                user.removeRole("291117656306876417").then(function() {
                    logging.log("Notification toggle", "Toggled notifications OFF for "+ message.author.username, "green")
                }).catch(function() {
                    console.log("Error in toggling Moderator notifications. Removing role didn't work");
                    message.reply("Uh oh, something went wrong. I have notifed the HUD Dev team and they will look into it shortly");
                    logging.legacyLog("Something broke whilst trying to remove Notifications for " + message.author.username + ".\n<@155963500265603072> <@98153298237857792> <@142314965695594496>");
                });
            }
        }
        if (args[0] != undefined) {
            for(i=0; i<config.games.length; i++) {
                if (args[0].toLowerCase() == config.games[i][0]) {
                    if (user.roles.get(config.games[i][1]) == undefined) {
                        message.reply("Your " + config.games[i][2] + " notifications have been toggled ON");
                        user.addRole(config.games[i][1]).then(function() {
                            logging.log("Notification toggle", "Toggled " + config.games[i][2] + " notifications ON for "+ message.author.username, "green")
                        }).catch(function() {
                            console.log("Error in toggling " + config.games[i][2] + " notifications. Adding role didn't work");
                            message.reply("Uh oh, something went wrong. I have notified the HUD Dev team and they will look into it shortly.");
                            logging.legacyLog("Something broke whilst trying to add Notifications for " + messag.author.username + ".\n<@155963500265603072> <@98153298237857792> <@142314965695594496>");
                        });
                    } else {
                        message.reply("Your " + config.games[i][2] + " notifications have been toggled OFF");
                        user.removeRole(config.games[i][1]).then(function() {
                            logging.log("Notification toggle", "Toggled " + config.games[i][2] + " notifications OFF for "+ message.author.username, "green")
                        }).catch(function() {
                            console.log("Error in toggling " + config.games[i][2] + " notifications. Removing role didn't work");
                            message.reply("Uh oh, something went wrong. I have notifed the HUD Dev team and they will look into it shortly");
                            logging.legacyLog("Something broke whilst trying to remove Notifications for " + message.author.username + ".\n<@155963500265603072> <@98153298237857792> <@142314965695594496>");
                        });
                    }
                }
            }
            if (args[0] == "list") {
                if (args[1] == undefined || isNaN(args[1])) {
                    var listPage = 1;
                } else if (args[1] > Math.ceil(config.games.length/10)) {
                    var listPage = Math.ceil(config.games.length/10);
                } else {
                    var listPage = parseInt(args[1]);
                }
                var messageList = "";
                for (i=(listPage*10-10); i<listPage*10 && i<config.games.length; i++) {
                    messageList += config.games[i][3] + "\n";
                }
                messageList += "Showing page " + listPage + " out of " + Math.ceil(config.games.length/10) + "\n\nUse `-toggle {CODE}` to toggle notifications off for a certain gamemode";
                if (listPage<Math.ceil(config.games.length/10)) {
                    messageList += "\nUse `-toggle list " + (listPage+1) + "` for the next page.";
                }
                message.reply("",
                    {
                        embed: embed("The Hive Gamemode List",
                        messageList, "blue")
                    }    
                );
            }
        } else {
            message.reply("Command usage:\nUse `-toggle {CODE}` to toggle notifications for a specific gamemode.\nUse `-toggle list` to see the list of all the gamemodes")
        }
    }
}