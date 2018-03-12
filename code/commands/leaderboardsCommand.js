function checkDM(msg, DM, div) {
    if (DM != "dm") {
        msg.delete(30000/div);
    }
};
module.exports = {
    description: "Provides leaderboard info for a specified user on the Hive.",
    usage: "-leaderboards {Game Code}",
    allowedInDM: true,
    allowedChannels: ["281725164247449600","262700752613539840", "262700708925669376", "262703646452613120", "262700135644004352", "262702429282238465", "262699631123759106", "262703696306110477", "262701246559944704", "262704059595620352", "262701380597186560", "262701745132535808", "262699939027484674"],
    call: function(message, args){
        if (args[0]==undefined) {
            message.reply("The proper usage for the command is: " +
            "\n-leaderboards {Game Code} {Player/Position}"+
            "\nFor list of available Main Game Codes, type \"-leaderboards list\"");
        }else{
        switch (args[0].toLowerCase()) {
            case "gnt":
                var divN = 1;
                if (message.channel.id == "262700752613539840") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);
                }
                req("https://onesrodriguez.com/hive/position/GNT/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Sky Giants Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/GNT/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Sky Giants leaderboard.\n" +
                            "`" + data.username + "` is on the top of Sky Giants leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Sky Giants Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/GNT/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Sky Giants leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Sky Giants Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                }
                });
                break;
                case "hide":
                var divN = 1;
                if (message.channel.id == "262699631123759106") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/HIDE/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (data.position){
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " wins to reach the top 1000.";
                            message.reply("",{embed: embed("Hide and Seek Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/HIDE/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Hide  and Seek leaderboard.\n" +
                            "`" + data.username + "` is on the top of Hide  and Seek leaderboard and " + (data.points - data2.points) + " wins ahead of #2.";
                            message.reply("",{embed: embed("Hide  and Seek Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/HIDE/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Hide  and Seek leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " wins " + mess;
                            message.reply("",{embed: embed("Hide  and Seek Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "We were unable to get leaderboard data for " + args[1] + ". Have you perhaps misspelled the players name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
                case "dr":
                var divN = 1;
                if (message.channel.id == "262702429282238465") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/DR/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Death Run Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/DR/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Death Run leaderboard.\n" +
                            "`" + data.username + "` is on the top of Death Run leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Death Run Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/DR/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Death Run leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Death Run Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
                case "timv":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/TIMV/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " karma to reach the top 1000.";
                            message.reply("",{embed: embed("Trouble in Mineville Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/TIMV/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Trouble in Mineville leaderboard.\n" +
                            "`" + data.username + "` is on the top of Trouble in Mineville leaderboard and " + (data.points - data2.points) + " karma ahead of #2.";
                            message.reply("",{embed: embed("Trouble in Mineville Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/TIMV/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Trouble in Mineville leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " karma " + mess;
                            message.reply("",{embed: embed("Trouble in Mineville Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
                case "bed":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/BED/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Bed Wars Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/BED/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Trouble in Mineville leaderboard.\n" +
                            "`" + data.username + "` is on the top of Bed Wars leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Bed Wars Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/BED/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Bed Wars leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " kpoints " + mess;
                            message.reply("",{embed: embed("Bed Wars Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
                case "spl":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/SPL/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Sploop Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/SPL/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Sploop leaderboard.\n" +
                            "`" + data.username + "` is on the top of Sploop leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Sploop Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/SPL/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Sploop leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Sploop Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                     }
                });
                break;
            case "draw":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/DRAW/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Draw It Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/DRAW/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Draw Itleaderboard.\n" +
                            "`" + data.username + "` is on the top of Draw It leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Draw It Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/DRAW/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Draw It leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Draw It Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "ef":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/EF/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                     if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Electric Floor Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/EF/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Electric Floorleaderboard.\n" +
                            "`" + data.username + "` is on the top of Electric Floor leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Electric Floor Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/EF/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Electric Floor leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Electric Floor Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "grav":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/GRAV/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                     if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Gravity Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/GRAV/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Gravityleaderboard.\n" +
                            "`" + data.username + "` is on the top of Gravity leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Gravity Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/GRAV/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Gravity leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Gravity Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "bp":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/BP/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                     if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Block Party Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/BP/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Block Partyleaderboard.\n" +
                            "`" + data.username + "` is on the top of Block Party leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Block Party Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/BP/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Block Party leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Block Party Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "cai":
                var divN = 1;
                if (message.channel.id == "262700135644004352") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/CAI/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Cowboys and Indians Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/CAI/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Cowboys and Indiansleaderboard.\n" +
                            "`" + data.username + "` is on the top of Cowboys and Indians leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Cowboys and Indians Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/CAI/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Cowboys and Indians leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Cowboys and Indians Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "sky":
                var divN = 1;
                if (message.channel.id == "262701246559944704") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/SKY/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Sky Wars Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/SKY/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Sky Wars leaderboard.\n" +
                            "`" + data.username + "` is on the top of Sky Wars leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Sky Wars Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/SKY/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Sky Wars leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Sky Wars Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "hb":
                var divN = 1;
                if (message.channel.id == "262701745132535808") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/HB/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("The Herobrine Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/HB/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the The Herobrineleaderboard.\n" +
                            "`" + data.username + "` is on the top of The Herobrine leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("The Herobrine Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/HB/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the The Herobrine leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("The Herobrine Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "lab":
                var divN = 1;
                if (message.channel.id == "262699939027484674") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/LAB/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " Atoms to reach the top 1000.";
                            message.reply("",{embed: embed("The Lab Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/LAB/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the The Lableaderboard.\n" +
                            "`" + data.username + "` is on the top of The Lab leaderboard and " + (data.points - data2.points) + " Atoms ahead of #2.";
                            message.reply("",{embed: embed("The Lab Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/LAB/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the The Lab leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " Atoms " + mess;
                            message.reply("",{embed: embed("The Lab Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "cr":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/CR/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Cranked Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/CR/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Crankedleaderboard.\n" +
                            "`" + data.username + "` is on the top of Cranked leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Cranked Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/CR/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Cranked leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Cranked Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "rr":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/RR/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Restaurant Rush Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/RR/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Restaurant Rushleaderboard.\n" +
                            "`" + data.username + "` is on the top of Restaurant Rush leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Restaurant Rush Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/RR/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Restaurant Rush leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Restaurant Rush Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "sg":
                var divN = 1;
                if (message.channel.id == "262701380597186560") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/SG/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " wins to reach the top 1000.";
                            message.reply("",{embed: embed("Survival Games: Classic Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/SG/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Survival Games: Classicleaderboard.\n" +
                            "`" + data.username + "` is on the top of Survival Games: Classic leaderboard and " + (data.points - data2.points) + " wins ahead of #2.";
                            message.reply("",{embed: embed("Survival Games: Classic Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/SG/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Survival Games: Classic leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " wins " + mess;
                            message.reply("",{embed: embed("Survival Games: Classic Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "oitc":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/OITC/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " wins to reach the top 1000.";
                            message.reply("",{embed: embed("One in The Chamber Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/OITC/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the One in The Chamberleaderboard.\n" +
                            "`" + data.username + "` is on the top of One in The Chamber leaderboard and " + (data.points - data2.points) + " wins ahead of #2.";
                            message.reply("",{embed: embed("One in The Chamber Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/OITC/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the One in The Chamber leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " wins " + mess;
                            message.reply("",{embed: embed("One in The Chamber Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "mm":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/MM/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Music Masters Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/MM/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Music Mastersleaderboard.\n" +
                            "`" + data.username + "` is on the top of Music Masters leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Music Masters Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/MM/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Music Masters leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Music Masters Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "slap":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/SLAP/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Slaparoo Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/SLAP/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Slaparooleaderboard.\n" +
                            "`" + data.username + "` is on the top of Slaparoo leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Slaparoo Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/SLAP/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Slaparoo leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Slaparoo Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "hero":
                var divN = 1;
                if (message.channel.id == "262700708925669376" || message.channel.id == "262701380597186560") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/HERO/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " wins to reach the top 1000.";
                            message.reply("",{embed: embed("Survival Games: Heroes Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/HERO/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Survival Games: Heroesleaderboard.\n" +
                            "`" + data.username + "` is on the top of Survival Games: Heroes leaderboard and " + (data.points - data2.points) + " wins ahead of #2.";
                            message.reply("",{embed: embed("Survival Games: Heroes Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/HERO/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Survival Games: Heroes leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " wins " + mess;
                            message.reply("",{embed: embed("Survival Games: Heroes Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "sgn":
                var divN = 1;
                if (message.channel.id == "262701380597186560") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/SGN/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " wins to reach the top 1000.";
                            message.reply("",{embed: embed("Survival Games 2.0 Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/SGN/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Survival Games 2.0leaderboard.\n" +
                            "`" + data.username + "` is on the top of Survival Games 2.0 leaderboard and " + (data.points - data2.points) + " wins ahead of #2.";
                            message.reply("",{embed: embed("Survival Games 2.0 Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/SGN/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Survival Games 2.0 leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " wins " + mess;
                            message.reply("",{embed: embed("Survival Games 2.0 Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "sp":
                var divN = 1;
                if (message.channel.id == "262704059595620352") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/SP/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Splegg Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/SP/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Spleggleaderboard.\n" +
                            "`" + data.username + "` is on the top of Splegg leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Splegg Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/SP/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Splegg leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Splegg Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
            break;
            case "mimv":
                var divN = 1;
                if (message.channel.id == "262700708925669376") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/MIMV/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " karma to reach the top 1000.";
                            message.reply("",{embed: embed("Murder in Mineville Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/MIMV/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Murder in Minevilleleaderboard.\n" +
                            "`" + data.username + "` is on the top of Murder in Mineville leaderboard and " + (data.points - data2.points) + " karma ahead of #2.";
                            message.reply("",{embed: embed("Murder in Mineville Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/MIMV/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Murder in Mineville leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " karma " + mess;
                            message.reply("",{embed: embed("Murder in Mineville Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "gntm":
                var divN = 1;
                if (message.channel.id == "262700752613539840") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/GNTM/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    
                    var test = data.position;
                    if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Sky Giants: Mini Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/GNTM/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Sky Giants: Mini leaderboard.\n" +
                            "`" + data.username + "` is on the top of Sky Giants: Mini leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Sky Giants: Mini Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/GNTM/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Sky Giants: Mini leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points " + mess;
                            message.reply("",{embed: embed("Sky Giants: Mini Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "bd":
                var divN = 1;
                if (message.channel.id == "262703646452613120") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
            var top = false;
                if (args[1].toLowerCase() == "top"){
                    var top = true;
                    args[1] = args[2];
                } else {
                    var top = false;
                }
                if (!isNaN(args[1])) {
                    args[1] = (args[1]-1);;
                }
                req("https://onesrodriguez.com/hive/position/BD/" + args[1], function (error, response, body) {
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var data = JSON.parse(body);
                    if (top == true) {
                        var pos = 0;
                        var mess = "to reach the top of the leaderboards.";
                    } else {
                        var pos = (data.position - 1);
                        var mess = "to rise to #" + data.position + ".";
                    }
                    var test = data.position;
                     if (test == "-1") {
                            var leaderboardMessage = "`" + data.username + "` is not on the Leaderboards.\n" +
                            "`" + data.username + "` needs " + data.needed + " points to reach the top 1000.";
                            message.reply("",{embed: embed("Battery Dash Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else if (test == "0"){
                        req("https://onesrodriguez.com/hive/position/BD/1", function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Battery Dash leaderboard.\n" +
                            "`" + data.username + "` is on the top of Battery Dash leaderboard and " + (data.points - data2.points) + " points ahead of #2.";
                            message.reply("",{embed: embed("Battery Dash Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                        });
                    } else if (test != "0") {
                        req("https://onesrodriguez.com/hive/position/BD/" + pos, function (error2, response2, body2) {
                            var data2 = JSON.parse(body2);
                            
                            var leaderboardMessage = "`" + data.username + "` is #" + (data.position + 1) + " on the Battery Dash leaderboard.\n"
                            + "`" + data.username + "` needs " + (data2.points - data.points + 1) + " points "+ mess;
                            message.reply("",{embed: embed("Battery Dash Leaderboard", leaderboardMessage, "gold")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    });
                    }
                });
                break;
            case "arcade":
                var divN = 1;
                if (message.channel.id == "262703646452613120") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                message.reply("",
                    {
                            embed: embed("HiveMC Leaderboards Help",
                            "Arcade game codes:\n" +
                            " • Battery Dash - BD\n" +
                            " • Cranked - CR\n" +
                            " • Draw It - DRAW\n" +
                            " • Electric Floor - EF\n" +
                            " • Gravity - GRAV\n" +
                            " • Music Masters - MM\n" +
                            " • One in The Chamber - OITC\n" +
                            " • Restaurant Rush - RR\n" +
                            " • Slaparoo - SLAP\n" +
                            " • Sploop - SPL\n" +
                            " • Survival Games: Heroes - HERO" +
                            "\n\nUsage: -leaderboards {GAME-CODE} {PLAYERNAME or POSITION}", "blue")
                    }).then(msg => checkDM(msg, message.channel.type, divN));
                break;
            default:
                var divN = 1;
                if (message.channel.id != "262703646452613120") {divN = 2;}
                if (message.channel.type != "dm") {message.delete();}
                message.reply("",
                    {
                        embed: embed("HiveMC Leaderboards Help",
                            "Available Gamemodes: \n" +
                            " • Block Party - BP\n" +
                            " • Cowboys and Indians - CAI\n" +
                            " • DeathRun - DR\n" +
                            "*For DeathRun Map Times use DRMT*\n" +
                            " • Hide and Seek - HIDE\n" +
                            " • Murder in Mineville - MIMV\n" +
                            " • SkyGiants - GNT\n" +
                            " • SkyGiants: Mini - GNTM\n" +
                            " • Sky Wars - SKY\n" +
                            " • Splegg - SP\n" +
                            " • Survival Games - SG\n" +
                            " • Survival Games 2.0 - SGN\n" +
                            " • The Herobrine - HB\n" +
                            " • The Lab - LAB\n" +
                            " • Trouble in Mineville - TIMV\n" +
                            "For Arcade game codes use -leaderboards Arcade\n" +
                            "\n\nUsage: -leaderboards {GAME-CODE} {PLAYERNAME or POSITION}", "blue")
                    }).then(msg => checkDM(msg, message.channel.type, divN));
                break;
        }
    }
    }
};

function numberWithCommas(x) {
    var numberString = "" + x;
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
