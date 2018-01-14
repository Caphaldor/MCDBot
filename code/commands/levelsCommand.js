function blockLevel(xp) {
    var temp = "Block not used";
    if (xp != "N/A") {
		var level = 1;
		//50 XP is removed due to a bug(?) in the system
		var exp = xp-50;
        while((exp-level*50) >= 0) {
			exp = exp-level*50;
			level++
		}
		temp = level;
    } return temp;
};
//checks for deletion in case not in DM
function checkDM(msg, DM, div) {
    if (DM != "dm") {
        msg.delete(30000/div);
    }
};
module.exports = {
    description: "Showcasing times for Death Run and Gravity Maps",
    usage: "-times",
    allowedInDM: true,
    allowedChannels: ["281725164247449600","262702429282238465","335817153603305473"],
    call: function(message, args){
        var divN = 2;
        if (args[0] == undefined) {
            message.reply("The proper usage of this command is `-levels {PLAYER} <PAGE>`").then(msg => checkDM(msg, message.channel.type, divN));
        } else {
		req("http://api.hivemc.com/v1/player/" + args[0] + "/HIDE", function (error, response, body) {
                if (message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                if (error){logging.legacyLog("URGENT HTTP ERROR")}
                var hiveData = JSON.parse(body);
				message.reply(hiveData.rawBlockExperience[args[1]] + "XP => Level " + blockLevel(hiveData.rawBlockExperience[args[1]]));
				//var playerLevels = Object.keys(config.blocks).map(function(e) {
				//	var temp = "N/A";
				//	if (hiveData.rawBlockExperience[e] != undefined) {
                //        temp = blockLevel(hiveData.rawBlockExperience[e]);
                //    }
                //    return [config.blocks[e], temp];
				//});
				//message.reply(playerLevels.[args[1]]);
		});
        if ((args[0].toLowerCase()=="deathrun")||(args[0].toLowerCase()=="dr")) {
            req("http://api.hivemc.com/v1/game/dr/maps", function (error, response, body) {
                if (message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                if (error){logging.legacyLog("URGENT HTTP ERROR")}
                var hiveData = JSON.parse(body);
                req("http://api.hivemc.com/v1/player/" + args[1] + "/DR", function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var hivePlayerData = JSON.parse(body);
                    if (hivePlayerData.UUID) {
                    var playertimes = Object.keys(hiveData).map(function(e) {
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
                    if (args[2] == undefined || isNaN(args[2])) {
                        var listPage = 1;
                    } else if (args[2] > Math.ceil(playertimes.length/10)) {
                        var listPage = Math.ceil(playertimes.length/10);
                    } else {
                        var listPage = parseInt(args[2]);
                    }
                    var messageList = "";
                    for (i=(listPage*10-10); i<listPage*10 && i<playertimes.length; i++) {
                        messageList += "• **" + playertimes[i][1] + "** - " + timeF(playertimes[i][0]) + "\n";
                    }
                    messageList += "*Showing page " + listPage + " out of " + Math.ceil(playertimes.length/10) + "*\n";
                    if (listPage<Math.ceil(playertimes.length/10)) {
                        messageList += "\nUse `-times DeathRun" + args[1] + " " + (listPage+1) + "` for the next page.";
                    }
                    message.reply("",
                        {
                            embed: embed("Death Run Records for " + args[1],
                            messageList, "blue")
                        }    
                    ).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                        {
                            embed: embed("Error",
                                "An error occured. Maybe you misspelled the player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            });
        } else if ((args[0].toLowerCase()=="gravity")||(args[0].toLowerCase()=="grav")) {
             req("http://api.hivemc.com/v1/game/grav/maps", function (error, response, body) {
                var divN = 2;
                if (message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                if (error){logging.legacyLog("URGENT HTTP ERROR")}
                var hiveData = JSON.parse(body);
                req("http://api.hivemc.com/v1/player/" + args[1] + "/grav", function (error2, response2, body2) {
                    if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                    var hivePlayerData = JSON.parse(body2);
                    if (hivePlayerData.UUID) {
                    var allMaps = Object.keys(hiveData).map(function(e) {
                        return [hiveData[e].mapname.toLowerCase()]
                    }).sort(function(a,b){
                        if(a[1] < b[1]) return -1;
                        if(a[1] > b[1]) return 1;
                        return 0;
                    });
                    var playerMapNames = {};
                    var actualMapNames = {};
                    Object.keys(hivePlayerData.maprecords).map(function(e) {
                        var tempM = "";
                        var tempA = e.toLowerCase().split("_");
                        var tempN = "";
                        tempA.forEach(function(z,zz){
                            tempN += tempA[zz].charAt(0).toUpperCase() + tempA[zz].substring(1) + " ";
                            tempM += tempA[zz].toLowerCase();
                        });
                    playerMapNames[tempM]=hivePlayerData.maprecords[e];
                    actualMapNames[tempM]=tempN;
                });
                var playertimes = [[]];
                allMaps.forEach(function(e,z) {
                        var temp = "N/A";
                        if (playerMapNames[e] != undefined) {
                            temp = playerMapNames[e];
                        }
                        var tempA = "Map";
                        if (actualMapNames[e] == undefined) {
                            tempA = e[0].charAt(0).toUpperCase() + e[0].substring(1);
                        } else {
                            tempA = actualMapNames[e];
                        }
                        playertimes[z] = [temp, tempA];
                    });
                    playertimes.sort(function(a,b){
                        if(a[1] < b[1]) return -1;
                        if(a[1] > b[1]) return 1;
                        return 0;
                    });
                if (args[2] == undefined || isNaN(args[2])) {
                    var listPage = 1;
                } else if (args[2] > Math.ceil(playertimes.length/10)) {
                    var listPage = Math.ceil(playertimes.length/10);
                } else {
                    var listPage = parseInt(args[2]);
                }
                var messageList = "";
                for (i=(listPage*10-10); i<listPage*10 && i<playertimes.length; i++) {
                    messageList += "• **" + playertimes[i][1] + "** - " + timeG(playertimes[i][0]) + " seconds\n";
                }
                messageList += "*Showing page " + listPage + " out of " + Math.ceil(playertimes.length/10) + "*\n";
                if (listPage<Math.ceil(playertimes.length/10)) {
                    messageList += "\nUse `-times Gravity " + args[1] + " " + (listPage+1) + "` for the next page.";
                }
                message.reply("",
                    {
                        embed: embed("Gravity Records for " + args[1],
                        messageList, "blue")
                    }    
                ).then(msg => checkDM(msg, message.channel.type, divN));
                }else{
                    message.reply("",
                    {
                        embed: embed("Error",
                            "An error occured. Maybe you misspelled the player's name?", "red")
                    }).then(msg => checkDM(msg, message.channel.type, divN));
                }
                });
            });
        }
        }
    }
};