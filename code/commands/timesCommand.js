function timeG(valu) {
    var temp = "Map not played\n";
    if (valu != "N/A") {
        var minutes = "";
        if ((valu/60000)>1) {
            minutes = Math.floor(valu/60000) + ":";
        }
        var seconds = "";
        if ((valu/10000) > 1) {
            seconds += Math.floor((valu % 60000)/10000);
        }
        seconds += Math.floor((valu%10000)/1000);
        var miliseconds = ".";
        if ((valu%1000)/100 < 1) {
            miliseconds += "0";
            if ((valu%100)/10 < 1) {
                miliseconds += "0";
            }
        }
        miliseconds += (valu % 1000);
        temp = minutes + seconds + miliseconds + " seconds\n";
    } return temp;
};
//checks for deletion in case not in DM
function checkDM(msg, DM, div) {
    if (DM != "dm") {
        msg.delete(30000/div);
    }
};
module.exports = {
    description: "Showcasing record times for Gravity Maps",
    usage: "-times {Player} <Page>",
    allowedInDM: true,
    allowedChannels: ["281725164247449600","335817153603305473"],
    call: function(message, args){
        if (args[0]==undefined) {
            message.reply("The proper usage of this command is `-times {PLAYER} <PAGE>`").then(msg => checkDM(msg, message.channel.type, 1));
        } else {
            req("http://api.hivemc.com/v1/game/grav/maps", function (error, response, body) {
                var divN = 2;
                if (message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                if (error){logging.legacyLog("URGENT HTTP ERROR")}
                var hiveData = JSON.parse(body);
                req("http://api.hivemc.com/v1/player/" + args[0] + "/grav", function (error2, response2, body2) {
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
                if (args[1] == undefined || isNaN(args[1])) {
                    var listPage = 1;
                } else if (args[1] > Math.ceil(playertimes.length/10)) {
                    var listPage = Math.ceil(playertimes.length/10);
                } else {
                    var listPage = parseInt(args[1]);
                }
                var messageList = "";
                for (i=(listPage*10-10); i<listPage*10 && i<playertimes.length; i++) {
                    messageList += "• **" + playertimes[i][1] + "** - " + timeG(playertimes[i][0]);
                }
                messageList += "*Showing page " + listPage + " out of " + Math.ceil(playertimes.length/10) + "*\n";
                if (listPage<Math.ceil(playertimes.length/10)) {
                    messageList += "\nUse `-times " + args[0] + " " + (listPage+1) + "` for the next page.";
                }
                message.reply("",
                    {
                        embed: embed("Gravity Records for `" + args[0] + "`",
                        messageList, "gold")
                    }    
                ).then(msg => checkDM(msg, message.channel.type, divN));
                }else{
                    message.reply("",
                    {
                        embed: embed("Error",
                            "An error occured.\mMaybe you misspelled the player's name?", "red")
                    }).then(msg => checkDM(msg, message.channel.type, divN));
                }
                });
            });
        }
    }
};