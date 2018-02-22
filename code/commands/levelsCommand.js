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
		var bars = 20;
		var leftoverXP = Math.floor(bars*exp/(level*50))
		var end = bars-leftoverXP;
		for (; leftoverXP > 0; leftoverXP--) {
			progressBar += "▮";
		}
		for (; end > 0; end--) {
			progressBar += "▯";
		}
		progressBar += "`  " + exp + "/" + (level*50);
	}
	temp = "Level " + level;
	if (detail) {temp+= "\n    `" + progressBar}
    return temp;
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
    allowedChannels: ["281725164247449600","262699631123759106"],
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
                if (hiveData.UUID) {
				var detailValue = false;
				if (args[2] == true || args[2] == "detail" || args[2] == "-d") {detailValue = true;}
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
				var messageList = "";
                for (i=(listPage*pageCount-pageCount); i<listPage*pageCount && i<playerLevels.length; i++) {
                    messageList += "• **" + playerLevels[i][0] + "** - " + playerLevels[i][1] + "\n";
                }
                messageList += "*Showing page " + listPage + " out of " + Math.ceil(playerLevels.length/pageCount) + "*\n";
                if (listPage<Math.ceil(playerLevels.length/pageCount)) {
                    messageList += "\nUse `-levels " + args[0] + " " + (listPage+1) + "` for the next page.";
                }
                message.reply("",
                    {
                        embed: embed("Hide and Seek Block Levels for " + args[0],
                        messageList, "yellow")
                    }    
                ).then(msg => checkDM(msg, message.channel.type));
                }else{
                    message.reply("",
                    {
                        embed: embed("Error",
                            "An error occured.\nMaybe you misspelled the player's name?", "red")
                    }).then(msg => checkDM(msg, message.channel.type));
                }
		});
        }
    }
};