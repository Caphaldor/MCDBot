function recordTime(valu) {
    var temp = "Map not played";
    if (valu != "N/A") {
        temp = Math.floor(valu/60) + ":" + Math.floor((valu % 60)/10) + "" + (valu%10);
    } return temp;
};
//checks for deletion in case not in DM
function checkDM(msg, DM, div) {
    if (DM != "dm") {
        msg.delete(30000/div);
    }
};
module.exports = {
    description: "Showcasing various records from DeathRun",
    usage: "-records {Player} [Page] [-t|-d|-k|-td|-tk]",
    allowedInDM: true,
    allowedChannels: ["281725164247449600","262702429282238465","335817153603305473"],
    call: function(message, args){
        if (args[0]==undefined) {
            message.reply("The proper usage of this command is `-records {Player} [Page]`\n You can add one of: `-t`, `-d`, `-k`; at the end for different record lists").then(msg => checkDM(msg, message.channel.type, 1));
        } else if (args[0] == "help") {
            //Help with -t and alike
        } else {
            req("http://api.hivemc.com/v1/game/dr/maps", function (error, response, body) {
                var divN = 2;
                if (message.channel.id == "281725164247449600" || message.channel.id == "262702429282238465") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                if (error){logging.legacyLog("URGENT HTTP ERROR")}
                var hiveData = JSON.parse(body);
                req("http://api.hivemc.com/v1/player/" + args[1] + "/DR", function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var hivePlayerData = JSON.parse(body);
                    if (hivePlayerData.UUID) {
                        if (args[1] == "-k" || args[2] == "-k") {
                            var suffix = "-k";
                            var titleText = "DeathRun Kill Records";
                            var requestedArray = Object.keys(hiveData).map(function(e) {
                                var temp = "N/A";
                                if (hivePlayerData.mapkills[e] != undefined) {
                                    temp = hivePlayerData.mapkills[e];
                                }
                                return [temp, hiveData[e].mapname];
                            }).sort(function(a,b){
                                if(a[1] < b[1]) return -1;
                                if(a[1] > b[1]) return 1;
                                return 0;
                            });
                        } else if (args[1] == "-d" || args[2] == "-d") {
                            var suffix = "-d";
                            var titleText = "DeathRun Map Deaths";
                            var requestedArray = Object.keys(hiveData).map(function(e) {
                                var temp = "N/A";
                                if (hivePlayerData.mapdeaths[e] != undefined) {
                                    temp = hivePlayerData.mapdeaths[e];
                                }
                                return [temp, hiveData[e].mapname];
                            }).sort(function(a,b){
                                if(a[1] < b[1]) return -1;
                                if(a[1] > b[1]) return 1;
                                return 0;
                            });
                        } else {
                            var suffix = "-t";
                            var titleText = "DeathRun Record Times";
                            var requestedArray = Object.keys(hiveData).map(function(e) {
                                var temp = "N/A";
                                if (hivePlayerData.maprecords[e] != undefined) {
                                    temp = hivePlayerData.maprecords[e];
                                }
                                return [temp, hiveData[e].mapname];
                            }).sort(function(a,b){
                                if(a[1] < b[1]) return -1;
                                if(a[1] > b[1]) return 1;
                                return 0;
                            });
                        }
                        if (args[2] == undefined || isNaN(args[2])) {
                            var listPage = 1;
                        } else if (args[2] > Math.ceil(requestedArray.length/10)) {
                            var listPage = Math.ceil(requestedArray.length/10);
                        } else {
                            var listPage = parseInt(args[2]);
                        }
                        var messageList = "";
                        if (suffix=="-t") {
                            for (i=(listPage*10-10); i<listPage*10 && i<requestedArray.length; i++) {
                                messageList += "• **" + requestedArray[i][1] + "** - " + recordTime(requestedArray[i][0]) + "\n";
                            }
                        } else {
                            for (i=(listPage*10-10); i<listPage*10 && i<requestedArray.length; i++) {
                                messageList += "• **" + requestedArray[i][1] + "** - " + requestedArray[i][0] + "\n";
                            }
                        }
                        messageList += "*Showing page " + listPage + " out of " + Math.ceil(requestedArray.length/10) + "*\n";
                        if (listPage<Math.ceil(requestedArray.length/10)) {
                            messageList += "\nUse `-records " + args[1] + " " + (listPage+1) + " " + suffix + "` for the next page.";
                        }
                        message.reply("",
                            {
                                embed: embed(titleText + " for `" + args[1] + "`",
                                messageList, "gold")
                            }
                        ).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                        {
                            embed: embed("Error",
                                "An error occured.\nMaybe you misspelled the player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            });
        }
    }
};