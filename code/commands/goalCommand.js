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
function goalCountDecider(currentCount) {
    var temp = 0;
    while (temp<currentCount) {
    temp += Math.pow(10,temp.toString().length-1);
    }
    return temp;
};
function goalRatioDecider(currentRatio) {
    var temp = 0;
    return temp;
};
function timeEstimator(timeNeeded) {
    var temp = 0;
    var time = -1;
    var insaneGoal = false;
    var times = ["minutes", "hours", "days"]
    if (timeNeeded<100) {time = Math.floor(timeNeeded);}
    else if (timeNeeded<3000) {time = Math.floor(timeNeeded/60);temp = 1;}
    else if (timeNeeded<2000000) {time = Math.floor(timeNeeded/1440);temp = 2;}
    else {insaneGoal = true;}
    var message = "it will take about " + time + " " + times[temp];
    if (insaneGoal) {message = "you will never reach this goal";}
    return message;
}
//checks for deletion in case not in DM
function checkDM(msg, DM, div) {
    if (DM != "dm") {
        msg.delete(30000/div);
    }
};
module.exports = {
    description: "Tells players how much they need to reach a certain goal.",
    usage: "-goal {Player} {Game} {Goal} <Specific Goal>",
    allowedInDM: true,
    allowedChannels: ["281725164247449600","314752337354948608","335817153603305473","262700752613539840", "262700708925669376", "262703646452613120", "262700135644004352", "262702429282238465", "262699631123759106", "262703696306110477", "262701246559944704", "262704059595620352", "262701380597186560", "262701745132535808", "262699939027484674"],
    call: function(message, args){
        var divN = 2;
        if (args[0] == undefined) {
            message.reply("",{embed: embed("Error","The proper usage of this command is `-goal {Player} {Game} {Goal} <Specific Goal>`", "red")}).then(msg => checkDM(msg, message.channel.type, divN));;
        } else {
        if (goalsConfig[args[1].toLowerCase()] == undefined) {
            message.reply("",{embed: embed("Error","I'm sorry, but we do not support this gamemode yet. Make sure that `" + args[1] + "` is the proper game code for what you're looking for.", "red")}).then(msg => checkDM(msg, message.channel.type, divN));
        } else {
        if (!goalsConfig[args[1].toLowerCase()].availableGoals.includes(args[2].toLowerCase())) {
            message.reply("",{embed: embed("Error","I'm sorry, but I don't think I can check for this goal in the gamemode you specified. If you believe this is a mistake, please contact <@155963500265603072>.", "red")}).then(msg => checkDM(msg, message.channel.type, divN));
        } else {
        req("https://api.hivemc.com/v1/player/" + args[0] + "/" + args[1], function (error, response, body) {
            if (message.channel.id == "281725164247449600") {divN = 1;}
            if (message.channel.type != "dm") {message.delete();}
            if (error){logging.legacyLog("URGENT HTTP ERROR")}
            var hiveData = JSON.parse(body);
            if (!hiveData.UUID) {
                message.reply("",{embed: embed("Error","I'm sorry, but I couldn't find the player you asked for. Are you sure `" + args[0] + "` is correct?", "red")}).then(msg => checkDM(msg, message.channel.type, divN));
            } else {
            var response = "";
            var goalReached = false;
            var goalDescriptor = args[2].toLowerCase;
            if (goalsConfig.descriptors[args[2].toLowerCase()]) {goalDescriptor = goalsConfig.descriptors[args[2].toLowerCase()]}
            var switcher = args[2].toLowerCase();
            if (goalsConfig.genericGoals.includes(switcher)) {switcher = "generic";}
            if (goalsConfig.ratioGoals.includes(switcher)) {switcher = "ratio";}
            switch(switcher) {
                //General goals
                case "generic":
                    var actualAmount = hiveData[goalsConfig[args[1].toLowerCase][args[2].toLowerCase()]];
                    //Decide upon a goal
                    if (args[3]&&!isNaN(parseInt(args[3]))) {
                        var goalAmount = args[3];
                    } else {
                        var goalAmount = goalCountDecider(actualAmount);
                    }
                    //Check if goal has been reached
                    if (goalAmount<actualAmount) {goalReached = true; break;}
                    //check necessary wins
                    var needed = goalAmount - actualAmount;
                    //prepare text to show
                    var requirements = needed + " more" + goalDescriptor;
                    //calculate time it will take
                    //(takes goal/game from current stats)
                    var timeNeeded = ((needed*hiveData[goalsConfig[args[1].toLowerCase].games])/actualAmount)*(goalsConfig[args[1].toLowerCase()].gameTime.lobbyTime + (goalsConfig[args[1].toLowerCase()].gameTime.lowAwerage + goalsConfig[args[1].toLowerCase()].gameTime.highAverage)/2);
                    var timeToGoal = timeEstimator(timeNeeded/60);
                break;
                //Ratio goals
                case "ratio":

                break;


                //Gamemode specific goals

                default:
                    var actualAmount = hiveData[goalsConfig[args[1].toLowerCase][args]];
                    var goalAmount = -1;
                    var requirements = "missing";
                    var obstacle = "mistakes in code";
                    var timeToGoal = "something went wrong";
                break;
            }
            //Response
             if (!goalReached) {
                response = "You currently have " + actualAmount + " " + goalDescriptor + ". To get it up to " + goalAmount + " you will need " + requirements + ". It is estimated that " + timeToGoal + ".";
            } else {
                if (args[2] == "rankup") {
                    response = "From what I can see, you already have the top rank in the gamemode you specified. Sadly, I can't check how much you need for top KEK rank yet.";
                } else {
                    response = "From what I can see, you already reached the goal of " + goalAmount + " " + goalDescriptor + ", as you have " + actualAmount + ". Try a higher goal.";
                }
            }
            message.reply("",{embed: embed("` `",response, "gold")}).then(msg => checkDM(msg, message.channel.type, divN));
            }
        });}}






















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