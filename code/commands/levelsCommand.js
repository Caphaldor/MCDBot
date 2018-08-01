function hideLevel(expArray) {
    var level = 1;
    var exp = 0;
    for (i=0; expArray[i] != undefined; i++) {
        if (expArray[i][1] != "Block not used") {
            exp += expArray[i][1] - 50;
        }
    }
    while((exp-level*50) >= 0) {
   	    exp = exp-level*50;
        level++
    }
    return level;
};
function blockLevel(xp, detail) {
    var temp = xp;
	var level = 1;
	//50 XP is removed due to a bug(?) in the system
	var exp = xp-50;
    while((exp-level*50) >= 0) {
		exp = exp-level*50;
		level++
	}
	var progressBar = "";
	if (detail) {
		var bars = 10;
		var leftoverXP = Math.floor(bars*exp/(level*50))
		if (level == 30) {leftoverXP = 10}
		var end = bars-leftoverXP;
		for (; leftoverXP > 0; leftoverXP--) {
			progressBar += "▮";
		}
		for (; end > 0; end--) {
			progressBar += "▯";
		}
		if (level == 30) {
			progressBar +=  "`  *Max Level*";
		}else{
			progressBar += "`  *" + exp + "/" + (level*50) + "*";
		}
	}
	temp = "Level " + level;
	if (detail) {temp+= "\n  `" + progressBar}
    return temp;
};
//checks for deletion in case not in DM
function checkDM(msg, DM, div) {
    if (DM != "dm") {
        msg.delete(30000/div);
    }
};
module.exports = {
    description: "Lists players block levels from Hide and Seek. Adding `-d` at the end will add progress bars, adding `-o` will give an overview of all levels.",
    usage: "-levels {Player} <Page> [-d|-o]",
    allowedInDM: true,
    allowedChannels: ["281725164247449600","262699631123759106"],
    call: function(message, args){
        var divN = 2;
        if (args[0] == undefined) {
            message.reply("The proper usage of this command is `-levels {PLAYER} <PAGE> [-d]`").then(msg => checkDM(msg, message.channel.type, divN));
        } else {
		    req("http://api.hivemc.com/v1/player/" + args[0] + "/HIDE", function (error, response, body) {
                if (message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                if (error){logging.legacyLog("URGENT HTTP ERROR")}
                var hiveData = JSON.parse(body);
                if (hiveData.UUID) {
                    var detailValue = false;
                    if ((args[1] == "detail" || args[1] == "-d") || (args[2] == "detail" || args[2] == "-d")) {detailValue = true;}
                    var playerLevels = Object.keys(config.blocks).map(function(e) {
                        var temp = "Block not used";
                        if (hiveData.rawBlockExperience[e] != undefined) {
                            temp = blockLevel(hiveData.rawBlockExperience[e], detailValue);
                        }
                        return [config.blocks[e], temp];
                    }).sort(function(a,b){
                        if(a[0] < b[0]) return -1;
                        if(a[0] > b[0]) return 1;
                        return 0;
                    });
                    var pageCount = 10;
                    if (detailValue) {pageCount = 5}
                    if (args[1] == undefined || isNaN(args[1])) {
                        var listPage = 1;
                    } else if (args[1] > Math.ceil(playerLevels.length/pageCount)) {
                        var listPage = Math.ceil(playerLevels.length/pageCount);
                    } else {
                        var listPage = parseInt(args[1]);
                    }
                    if ((args[1] == "-o") || (args[2] == "-o")) {
                        var expInfo = Object.keys(config.blocks).map(function(e) {
                            var temp = "Block not used";
                            var level = -1;
                            if (hiveData.rawBlockExperience[e] != undefined) {
                                temp = hiveData.rawBlockExperience[e];
                                level = hiveData.blockExperience[e];
                            }
                            return [config.blocks[e], temp, level];
                        });
                        var messageFields = [];
                        var fieldNum=0;
                        var fieldInformation = [{title:"Unplayed blocks",count:0},{title:"Levels 1-4",count:0},{title:"Levels 5-9",count:0},{title:"Levels 10-14",count:0},{title:"Levels 15-19",count:0},{title:"Levels 20-24",count:0},{title:"Levels 25-29",count:0},{title:"Max Level Blocks",count:0},{title:"Levels 35-39",count:0},{title:"Levels 40-44",count:0},{title:"Levels 45-49",count:0},{title:"Max Level Blocks",count:0}];
                        for (i=0; expInfo[i] != undefined; i++) {
                            fieldInformation[Math.ceil((expInfo[i][2]/5)+0.1)].count++;
                        }
                        var fieldCounter = 0;
                        for (i=0; i<12;i++) {
                            if (fieldInformation[i].count) {
                                messageFields[fieldCounter] = {
                                    "name": fieldInformation[i].title,
                                    "value": fieldInformation[i].count,
                                    "inline": true
                                };
                                fieldCounter++;
                            }
                        }
                        messageFields[fieldCounter] = {
                            "name": "Total Hide and Seek Level*",
                            "value": hideLevel(expInfo) + "\n\n**Your total level from all of the experience you have earned.*"
                        };
                        message.reply("",
                            {
                                embed: {
                                "title": "Overview of Hide and Seek levels for " + args[0],
                                "color": 0xFFD700,
                                "fields": messageFields
                                }
                            }
                        ).then(msg => checkDM(msg, message.channel.type, divN));
                    } else {
                        var messageList = "";
                        var nextPage = ""
                        if (detailValue) {nextPage = " -d"}
                        for (i=(listPage*pageCount-pageCount); i<listPage*pageCount && i<playerLevels.length; i++) {
                            messageList += "• **" + playerLevels[i][0] + "** - " + playerLevels[i][1] + "\n";
                        }
                        messageList += "*Showing page " + listPage + " out of " + Math.ceil(playerLevels.length/pageCount) + "*\n";
                        if (listPage<Math.ceil(playerLevels.length/pageCount)) {
                            messageList += "\nUse `-levels " + args[0] + " " + (listPage+1) + nextPage + "` for the next page.";
                        }
                        message.reply("",
                            {
                                embed: embed("Hide and Seek Block Levels for " + args[0],
                                messageList, "gold")
                            }
                        ).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                }else{
                    message.reply("",
                    {
                        embed: embed("Error",
                            "An error occured.\nMaybe you misspelled the player's name?", "red")
                    }).then(msg => checkDM(msg, message.channel.type, divN));
                }
		    });
        }
    }
};