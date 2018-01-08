module.exports = {
    description: "Command used to redeem a token to verify the user's authentication status.",
    usage: "-token <token>",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        var token = args[0];
        var user = bot.guilds.get("262699181620068352").members.get(message.author.id);
        console.log(token);
        console.log(list);
        if (list.has(parseInt(token))) {
            //get the object information assigned with that token
            var state = list.get(parseInt(token));
            //only proceed if the token is not older than 120 secs
            if (!(Date.now() - state[0] > 120000)) {
                //get the uuid
                var uuid = state[1];
                //ask hive
                req("http://api.hivemc.com/v1/player/" + uuid.split("-").join(""), function (error, response, body) {
                    //in case Hive's API has issues
                    if (error) logging.legacyLog("FATAL HTTP ERROR. URGENT FIX NEEDED. IMMEDIATELY @maxthat");
                    //get Hive's response
                    var userHive = JSON.parse(body);
                    //set permission to error, in case we can't resolve it later
                    var permission = "ERROR";
                    //different cases based on a users rank name.
                    switch (userHive.modernRank["enum"]) {
                        case "VIP":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("269366973563928576").then(function() {
                                    user.setNickname(userHive.username);
                                });
                            });
                            permission = "VIP";
                            break;
                        case "YOUTUBER":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("394977230016479234").then(function() {
                                    user.setNickname(userHive.username);
                                });
                            });
                            permission = "YouTuber";
                            break;
                        case "STREAMER":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("394977878954999829").then(function() {
                                    user.setNickname(userHive.username);
                                });
                            });
                            permission = "Streamer";
                            break;
                        case "CONTRIBUTOR":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("394977534447452170").then(function() {
                                    user.setNickname(userHive.username);
                                });
                            });
                            permission = "Contributor";
                            break;
                        case "NECTAR":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("394978043124383755").then(function() {
                                    user.setNickname(userHive.username);
                                });
                            });
                            permission = "Team Nectar";
                            break;
                        case "OWNER":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("262709499331084290");
                            });
                            permission = "Owner";
                            break;
                        case "DEVELOPER":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("262709291520098304");
                            });
                            permission = "Developer";
                            break;
                        case "SRMODERATOR":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("262708985767919616");
                            });
                            permission = "Sr. Mod";
                            break;
                        case "MODERATOR":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRoles(["262707342783545344","291117656306876417"]);
                            }).then(function() {
                                user.sendMessage("Thank you for joining the community Discord!\n" +
                                "As a Moderator you are trusted in your judgement, and hence have access to #rulebreakers, where you can notify Discord Helpers directly if you took care of anyone breaking the rules.\n" +
                                "This is completely voluntary of course, you are not required to act in any way, but some help is always nice :)\n\n" +
                                "You will also get notifications from the @Moderator tag. But you can turn those off! All you need to do is `-toggle mod` and you will toggle whether or not you recieve notifications from the tag (Your rank will stay)");
                            });
                            permission = "Mod";
                            break;
                        case "ULTIMATE":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("394976377637568517").then(function() {
                                    user.setNickname(userHive.username);
                                });
                            });
                            permission = "Ultimate";
                            break;
                        case "EMERALD":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("262705801163046913").then(function() {
                                    user.setNickname(userHive.username);
                                });
                            });
                            permission = "Emerald";
                            break;
                        case "DIAMOND":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("262705596870950924").then(function() {
                                    user.setNickname(userHive.username);
                                });
                            });
                            permission = "Diamond";
                            break;
                        case "GOLD":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("262705142657187840").then(function() {
                                    user.setNickname(userHive.username);
                                });
                            });
                            permission = "Gold";
                            break;
                        case "REGULAR":
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]).then(function () {
                                user.addRole("284466226674139136").then(function() {
                                    user.setNickname(userHive.username);
                                });
                            });
                            permission = "Regular";
                            break;
                        default:
                            user.removeRoles(["291117656306876417","262705142657187840", "262705596870950924", "262705801163046913", "262707342783545344", "262708985767919616",
                                "262709291520098304", "262709499331084290", "269366973563928576", "284466226674139136","394976377637568517","394977230016479234","394977878954999829","394977534447452170","394978043124383755"]);
                            permission = "NONE / ISSUE / REMOVED ALL";
                            break;
                    }

                    //tell the user their rank
                    message.reply("You have been granted the rank: " + permission);
                    //remove the token from our list
                    list.delete(token);
                    //logging.log it
                    logging.log("Successful Rank Update", "User: " + message.author.username +
                        "\nUUID: " + uuid + " (" + userHive.username + ")" +
                        "\nRole: " + permission, "green");
                });
            } else {
                //2 minutes exceeded
                message.reply("Too late! You only have 120 seconds (2 minutes) to redeem your token.");
                //cleanup
                list.delete(token);
                //logging.log
                logging.log("Failed token validation by " + message.author.username, "The user attempted validating a token, " +
                    "but didn't meet the time requirement, therefore their request was declined and the token deleted.", "red");
            }
        } else {
            //too bad!
            message.reply("Invalid token!");
            logging.log("Failed token validation by " + message.author.username, "The user attempted validating a token (" +
                token + "), " +
                "but it was invalid or unknown.", "red");
        }
    }
};