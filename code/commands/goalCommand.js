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
    var assumedGoal = 0;
    while (assumedGoal<currentCount) {assumedGoal += Math.pow(10,assumedGoal.toString().length-1);}
    return assumedGoal;
};
function goalRatioDecider(currentRatio) {
    var assumedRatio = Math.ceil(currentRatio);
    return assumedRatio;
};
function timeEstimator(timeNeeded) {
    var temp = 0;
    var time = -1;
    var insaneGoal = false;
    var times = ["minutes", "hours", "days"]
    if (timeNeeded<100) {time = Math.floor(timeNeeded);}
    else if (timeNeeded<3000) {time = Math.floor(timeNeeded/60);temp = 1;}
    else if (timeNeeded<2000000) {time = (Math.floor(timeNeeded/480));temp = 2;}
    else {insaneGoal = true;}
    var message = "it will take you about " + time + " " + times[temp];
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
    allowedChannels: ["All"],
    call: function(message, args){
        var divN = 2;
        if (args[0] == undefined) {
            message.reply("",{embed: embed("Error","The proper usage of this command is `-goal {Player} {Game} {Goal} <Specific Goal>`", "red")}).then(msg => checkDM(msg, message.channel.type, divN));
        } else if ((args[0] == "help") && (args[1] == undefined)){
            if (message.channel.type != "dm") {message.delete();}
            message.reply("",{embed: embed("`-goal` help","To see an estimate of how long it will take for you to reach a goal, use this format: `-goal {Player} {Game} {Goal} [Specific Goal]` Where the [Specific Goal] is optional. For example, doing:\n`-goal _Tim HIDE deaths 12345` Will tell you how many more deaths _Tim will need until he reaches 12345, and how long it will take him to get there. But doing:\n`-goal _Tim HIDE deaths` will automatically pick the closest round goal for _Tim to reach, and say how long *that* will take.\n\nTo get the available goals for a game, do `-goal {GAME} available` *(temporary solution)*\nTo get the game codes use `-stats list` and `-stats arcade` *(temporary solution)*","white")}).then(msg => checkDM(msg, message.channel.type, divN));
        } else if ((args[1].toLowerCase() == "available")&&(goalsConfig[args[0].toLowerCase()] != undefined)){
            if (message.channel.type != "dm") {message.delete();}
            var response = "Available goals for `" + args[0] + "`:";
            goalsConfig[args[0].toLowerCase()].availableGoals.forEach(function(goal){
                response += "\n• " + goal;
            });
            message.reply("",{embed: embed("`-goal` Help",response,"white")}).then(msg => checkDM(msg, message.channel.type, divN));
        } else {
        if (goalsConfig[args[1].toLowerCase()] == undefined) {
            message.reply("",{embed: embed("Error","I'm sorry, but we do not support this gamemode yet. Make sure that `" + args[1] + "` is the proper game code for what you're looking for.\n*(full list of codes at `-stats list`)*", "red")}).then(msg => checkDM(msg, message.channel.type, divN));
        } else {
        if (!goalsConfig[args[1].toLowerCase()].availableGoals.includes(args[2].toLowerCase())) {
            message.reply("",{embed: embed("Error","I'm sorry, but I cannot check for this goal yet. Do\n`-goal " + args[1] + " available` to get the available goals.", "red")}).then(msg => checkDM(msg, message.channel.type, divN));
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
            var goalDescriptor = args[2].toLowerCase();
            var games = hiveData[goalsConfig[args[1].toLowerCase()].games];
            var averageGameTime = (goalsConfig[args[1].toLowerCase()].gameTime.lobbyTime + (goalsConfig[args[1].toLowerCase()].gameTime.lowAverage + goalsConfig[args[1].toLowerCase()].gameTime.highAverage)/2);
            if (goalsConfig.descriptors[args[2].toLowerCase()]) {goalDescriptor = goalsConfig.descriptors[args[2].toLowerCase()]}
            var switcher = args[2].toLowerCase();
            if (goalsConfig.genericGoals.includes(switcher)) {switcher = "generic";}
            if (goalsConfig.ratioGoals.includes(switcher)) {switcher = "ratio";}
            switch(switcher) {
                //General goals
                case "generic":
                    //Check current standing
                    if (args[2].toLowerCase() == "kills" && args[1].toLowerCase() == "hide") {
                        var actualAmount = hiveData.seekerkills + hiveData.hiderkills;
                    } else {
                        var actualAmount = hiveData[goalsConfig[args[1].toLowerCase()][args[2].toLowerCase()]];
                    }
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
                    //calculate time it will take
                    //(takes goal/game from current stats)
                    var timeNeeded = ((needed*games)/actualAmount)*averageGameTime;
                    var timeToGoal = timeEstimator(timeNeeded/60);
                    //prepare text to show
                    var requirements = needed + " more " + goalDescriptor;
                break;
                //Ratio goals
                case "ratio":
                    //Check current standing
                    var upper=lower=0;
                    if (args[2].toLowerCase() == "wl") {
                        upper = hiveData[goalsConfig[args[1].toLowerCase()].wins];
                        lower = games - upper;
                        var upperText = "wins";
                    } else if (args[2].toLowerCase() == "kd") {
                        if (args[1].toLowerCase() != "hide") {
                            upper = hiveData[goalsConfig[args[1].toLowerCase()].kills];
                        } else {
                            upper = hiveData.seekerkills + hiveData.hiderkills;
                        }
                        lower = hiveData[goalsConfig[args[1].toLowerCase()].deaths];
                        var upperText = "kills";
                    } else if (args[2].toLowerCase() == "noteacc") {
                        upper = hiveData.correctnotes * 100;
                        lower = hiveData.incorrectnotes+hiveData.correctnotes;
                        var upperText = "correct note hits";
                    } else if (args[2].toLowerCase() == "catacc") {
                        upper = hiveData.rccat_kills * 100;
                        lower = hiveData.rccat_count;
                        var upperText = "RC Cat kills";
                    } else if (args[2].toLowerCase() == "chickenacc") {
                        upper = hiveData.airstrike_kills * 100;
                        lower = hiveData.airstrike_count;
                        var upperText = "Airstrike kills";
                    } else if (args[2].toLowerCase() == "squidacc") {
                        upper = hiveData.sonicsquid_kills * 100;
                        lower = hiveData.sonicsquid_count;
                        var upperText = "Sonic Squid kills";
                    }
                    var actualAmount = upper/lower;
                    //Decide upon a goal
                    if (args[3]&&!isNaN(parseInt(args[3]))) {
                        var goalAmount = args[3];
                    } else {
                        var goalAmount = goalRatioDecider(actualAmount);
                    }
                    //Check if goal has been reached
                    if (goalAmount<actualAmount) {goalReached = true; break;}
                    //check necessary wins
                    var needed = goalAmount*lower - upper;
                    //calculates needed top variable. Mathematically dependent on the smaller output:
                    //WIll either: assume ratio of (2-currentRatio/goalRatio)*goalRatio
                    //          or assume ratio of (1+currentRatio/goalRatio)*goalRatio
                    if (goalAmount<(2*actualAmount)) {
                        var neededGames = ((upper - goalAmount*lower)/(1/(1+(upper/(lower*goalAmount)))-1))/(upper/games);
                    } else {
                        var neededGames = 2*lower*goalAmount - upper;
                    }
                    //then calculates the time it will take to get needed amount of top stat using system from /\
                    var timeNeeded = neededGames*averageGameTime;
                    var timeToGoal = timeEstimator(timeNeeded/60);
                    //To present the Ratio in a better manner:
                    actualAmount = Math.round(actualAmount*100)/100;
                    needed = Math.ceil(needed);
                    //prepare text to show
                    var requirements = needed + " more flawless " + upperText;
                break;
                //Rankup goals
                case "rankup":
                    //Check current standing
                    var currentRank = hiveData.title, nextRank = timeToGoal = "",pointsNomenclature = "points";
                    var currentPoints = hiveData[goalsConfig[args[1].toLowerCase()].points];
                    var rankPos = needed = -1,timeNeeded = 0;
                    var gameTitles = {};
                    req("http://api.hivemc.com/v1/game/" + args[1] + "/titles", function (error2, response2, body2) {
                        if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                        gameTitles = JSON.parse(body2);
                        //find what rank the player's at
                        for (i=0; i<gameTitles.length;i++) {
                            if (currentRank == gameTitles[i].plain_name) {
                                rankPos = i;
                                //setting i to high number quickly breaks the loop
                                i = 115;
                            }
                        }
                        //Check if top/highest rank has been reached
                        if ((rankPos == ((gameTitles.length)-1))|| (rankPos == 0)) {goalReached = true;} else {
                        //Check next rank requirements
                        nextRank = gameTitles[rankPos+1].plain_name;
                        needed = gameTitles[rankPos+1].required_points - currentPoints;
                        //calculate the time needed to get to it
                        timeNeeded = ((needed*games)/currentPoints)*averageGameTime;
                        timeToGoal = timeEstimator(timeNeeded/60);}
                    });
                    if ((args[1].toLowerCase == "timv") || (args[1].toLowerCase == "mimv") ) {
                        pointsNomenclature = "karma";
                    } else if (args[1].toLowerCase == "lab") {
                        pointsNomenclature = "atoms";
                    }
                    break;
                //Gamemode specific goals
                //Tempoary empty, will be added in future update
                default:
                    var actualAmount = hiveData[goalsConfig[args[1].toLowerCase()][args[2].toLowerCase]];
                    var goalAmount = -1;
                    var requirements = "unknown";
                    var timeToGoal = "something went wrong";
                break;
            }
            //Response
            if (args[2].toLowerCase() == "rankup") {
                //Timeout exists to go around asynchronous requests
                setTimeout(function(){
                if (!goalReached) {
                    response = "You currently have the rank of " + currentRank + ", and you need " + needed + " " + pointsNomenclature + " to reach " + nextRank + ". It is estimated that " + timeToGoal + ".";
                } else {
                    response = "From what I can see, you already have the highest rank in the gamemode you specified, so I can't help you. Congrats though!";
                }
                message.reply("",{embed: embed("` `",response, "gold")}).then(msg => checkDM(msg, message.channel.type, divN));
                },1337);
            } else {
                if (!goalReached) {
                    response = "You currently have " + actualAmount + " " + goalDescriptor + ". To get it up to " + goalAmount + " you will need " + requirements + ". It is estimated that " + timeToGoal + ".";
                } else {
                    response = "From what I can see, you already reached the goal of " + goalAmount + " " + goalDescriptor + ", as you have " + actualAmount + ". Try a higher goal.";
                }
                message.reply("",{embed: embed("` `",response, "gold")}).then(msg => checkDM(msg, message.channel.type, divN));
            }
            }
        });}}}
    }
};