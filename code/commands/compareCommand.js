//stats compare formatting function
function statsFormatting(variable, playerB) {
    var needed = (15 - variable.toString().length);
    var spaceString = "";
    for(var i = 0; i < needed; i++) {
        spaceString += " ";
    }
    if(!playerB) {
      return variable + spaceString;
    } else {
     return spaceString + variable;
    }
 }
 function leader(statText, varA, varB, more){
     var statA = " ";
     var statB = " ";
    if (more) {
        if (varA>varB) {
            statA = "⍣";
        } else if (varB>varA) {
            statB = "⍣";
        }
    } else {
         if (varA<varB) {
             statA = "⍣";
         } else if (varB<varA) {
             statB = "⍣";
         }
    }
    return statA + statText + statB;
 }
function theText(varA,varB,middleText,more) {
     var output = "";
     output = statsFormatting(varA,false) + leader(middleText,varA,varB,more) + statsFormatting(varB,true);
     return output;
}
function checkDM(msg, DM, div) {
    if (DM != "dm") {
        msg.delete(30000/div);
    }
};
module.exports = {
    description: "Compares statistics of two players\nFor list of available Main Game Codes, type \"-compare list\" \nFor list of available Arcade Game Codes, type \"-compare arcade\"",
    usage: "-compare {Game Code} {Player1} {Player2}",
    allowedInDM: true,
    allowedChannels: ["281725164247449600","314752337354948608","335817153603305473","262700752613539840", "262700708925669376", "262703646452613120", "262700135644004352", "262702429282238465", "262699631123759106", "262703696306110477", "262701246559944704", "262704059595620352", "262701380597186560", "262701745132535808", "262699939027484674"],
    call: function(message, args){
        if (args[0]==undefined) {
            if (message.channel.type != "dm") {message.delete();}
            message.reply("The proper usage for the command is: " +
            "\n-compare {Game Code} {Player1} {Player2}"+
            "\nFor list of available Main Game Codes, type `-compare list`"+
            "\nFor list of available Arcade Game Codes, type `-compare arcade`").then(msg => checkDM(msg, msg.channel.type, 2));
        }else{
        switch (args[0].toLowerCase()) {
            case "gntm":
                var divN = 2;
                if (message.channel.id == "262700752613539840" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/GNTM", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/GNTM", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of SkyGiants: Mini Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖  Category  ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖   Points   ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖ Victories  ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖Games Played‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" +                                    
                                    theText(playerA.kills,playerB.kills,"‖   Kills    ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖   Deaths   ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖    K/D     ‖",true) + "\n" +
                                    theText(playerA.gold_earned,playerB.gold_earned,"‖Gold  Earned‖",true) + "\n" +
                                    theText(playerA.beasts_slain,playerB.beasts_slain,"‖Beasts Slain‖",true) + "\n" +
                                    theText(playerA.shutdowns,playerB.shutdowns,"‖ Shutdowns  ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "gnt":
                var divN = 2;
                if (message.channel.id == "262700752613539840" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/GNT", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/GNT", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of SkyGiants Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖  Category  ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖   Points   ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖ Victories  ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖Games Played‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" +                               
                                    theText(playerA.kills,playerB.kills,"‖   Kills    ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖   Deaths   ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖    K/D     ‖",true) + "\n" +
                                    theText(playerA.gold_earned,playerB.gold_earned,"‖Gold  Earned‖",true) + "\n" +
                                    theText(playerA.beasts_slain,playerB.beasts_slain,"‖Beasts Slain‖",true) + "\n" +
                                    theText(playerA.shutdowns,playerB.shutdowns,"‖ Shutdowns  ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "spl":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SPL", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        var ravenA = playerA.character_stats.RavenCharacter ? (Math.round(100*(playerA.character_stats.RavenCharacter.kills/playerA.character_stats.RavenCharacter.deaths))/100) : "";
                        var oinkyA = playerA.character_stats.OinkyCharacter ? (Math.round(100*(playerA.character_stats.OinkyCharacter.kills/playerA.character_stats.OinkyCharacter.deaths))/100) : "";
                        var boosterA = playerA.character_stats.BoosterCharacter ? (Math.round(100*(playerA.character_stats.BoosterCharacter.kills/playerA.character_stats.BoosterCharacter.deaths))/100) : "";
                        var torsteinA = playerA.character_stats.TorsteinCharacter ? (Math.round(100*(playerA.character_stats.TorsteinCharacter.kills/playerA.character_stats.TorsteinCharacter.deaths))/100) : "";
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/SPL", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                                var ravenB = playerB.character_stats.RavenCharacter ? (Math.round(100*(playerB.character_stats.RavenCharacter.kills/playerB.character_stats.RavenCharacter.deaths))/100) : "";
                                var oinkyB = playerB.character_stats.OinkyCharacter ? (Math.round(100*(playerB.character_stats.OinkyCharacter.kills/playerB.character_stats.OinkyCharacter.deaths))/100) : "";
                                var boosterB = playerB.character_stats.BoosterCharacter ? (Math.round(100*(playerB.character_stats.BoosterCharacter.kills/playerB.character_stats.BoosterCharacter.deaths))/100) : "";
                                var torsteinB = playerB.character_stats.TorsteinCharacter ? (Math.round(100*(playerB.character_stats.TorsteinCharacter.kills/playerB.character_stats.TorsteinCharacter.deaths))/100) : "";
                                message.reply("",
                                {
                                embed: embed("Comparison of Sploop Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖   Category   ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖    Points    ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖  Victories   ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖ Games Played ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖  W/L  Ratio  ‖",true) + "\n" +                                   
                                    theText(playerA.kills,playerB.kills,"‖    Kills     ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖    Deaths    ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖     K/D      ‖",true) + "\n" +
                                    theText(playerA.blocks_painted,playerB.blocks_painted,"‖Blocks Painted‖",true) + "\n" +
                                    theText(playerA.ultimates_earned,playerB.ultimates_earned,"‖  Ultimates   ‖",true) + "\n" +
                                    theText(boosterA,boosterB,"‖ Booster  K/D ‖",true) + "\n" +
                                    theText(oinkyA,oinkyB,"‖  Oinky  K/D  ‖",true) + "\n" +
                                    theText(ravenA,ravenB,"‖  Raven  K/D  ‖",true) + "\n" +
                                    theText(torsteinA,torsteinB,"‖ Torstein K/D ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        })
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "draw":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/DRAW", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/DRAW", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Draw It Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖   Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖    Points     ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖   Victories   ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖ Games  Played ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" +                                    
                                    theText(playerA.correct_guesses,playerB.correct_guesses,"‖Correct Guesses‖",true) + "\n" +
                                    theText(playerA.incorrect_guesses,playerB.incorrect_guesses,"‖ Wrong guesses ‖",false) + "\n" + 
                                    theText(Math.round(100*playerA.correct_guesses/(playerA.correct_guesses+playerA.incorrect_guesses))/100,Math.round(100*playerB.correct_guesses/(playerB.correct_guesses+playerB.incorrect_guesses))/100,"‖C/W Guess Ratio‖", true) + "\n" +
                                    theText(playerA.skips,playerB.skips,"‖ Words Skipped ‖",false) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "bp":
                var divN = 2;
                if (message.channel.id == "262703646452613120" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/BP", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/BP", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Block Party Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖  Category  ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖   Points   ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖ Victories  ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖Games Played‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + 
                                    theText(playerA.total_placing,playerB.total_placing,"‖  Placings  ‖",true) + "\n" +
                                    theText(playerA.total_eliminations,playerB.total_eliminations,"‖Eliminations‖",false) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "mm":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/MM", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/MM", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Music Masters Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖   Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.points,playerB.points,"‖    Points     ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖   Victories   ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖ Games  Played ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + 
                                    theText(playerA.correctnotes,playerB.correctnotes,"‖ Correct Notes ‖",true) + "\n" +
                                    theText(playerA.incorrectnotes,playerB.incorrectnotes,"‖Incorrect Notes‖",false) + "\n" +
                                    theText(Math.round(1000*playerA.correctnotes/(playerA.correctnotes+playerA.incorrectnotes))/1000,Math.round(1000*playerB.correctnotes/(playerB.correctnotes+playerB.incorrectnotes))/1000,"‖ Note Accuracy ‖",true) + "\n" +
                                    theText(playerA.notes_good,playerB.notes_good,"‖  Good  Notes  ‖",true) +"\n" +
                                    theText(playerA.notes_perfect,playerB.notes_perfect,"‖ Perfect Notes ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "sky":
                var divN = 2;
                if (message.channel.id == "262701246559944704" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SKY", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/SKY", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Sky Wars Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖  Category  ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖   Points   ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖ Victories  ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖Games Played‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" +  
                                    theText(playerA.kills,playerB.kills,"‖   Kills    ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖   Deaths   ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖ K/D  Ratio ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "slap":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SLAP", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/SLAP", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Block Slaparoo of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖  Category  ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.points,playerB.points,"‖   Points   ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖ Victories  ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖Games Played‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + 
                                    theText(playerA.kills,playerB.kills,"‖ Slap-Offs  ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖   Deaths   ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖ K/D  Ratio ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, 1));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "timv":
                var divN = 2;
                if (message.channel.id == "262703696306110477" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/TIMV", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/TIMV", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Trouble in Mineville Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖    Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖     Karma      ‖",true) + "\n" +
                                    theText(playerA.most_points,playerB.most_points,"‖   Most Karma   ‖",true) + "\n" +
                                    theText(playerA.role_points,playerB.role_points,"‖  Role  Points  ‖",true) + "\n" +
                                    theText(playerA.d_points,playerB.d_points,"‖Detective Points‖",true) + "\n" +
                                    theText(playerA.i_points,playerB.i_points,"‖Innocent  Points‖",true) + "\n" +
                                    theText(playerA.t_points,playerB.t_points,"‖ Traitor Points ‖",true) + "\n" + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "mimv":
                var divN = 2;
                if (message.channel.id == "262703696306110477" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/MIMV", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/MIMV", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Murder in Mineville Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖  Category  ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖   Karma    ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖ Victories  ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖Games Played‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" +  
                                    theText(playerA.kills,playerB.kills,"‖   Kills    ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖   Deaths   ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖ K/D  Ratio ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "hide":
                var divN = 2;
                if (message.channel.id == "262699631123759106" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/HIDE", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/HIDE", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Hide and Seek Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖   Category   ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖    Points    ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖  Victories   ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖ Games Played ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖  W/L  Ratio  ‖",true) + "\n" + 
                                    theText(playerA.seekerkills,playerB.seekerkills,"‖Hiders  Killed‖",true) + "\n" +
                                    theText(playerA.hiderkills,playerB.hiderkills,"‖Seekers Killed‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖    Deaths    ‖",false) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "dr":
                var divN = 2;
                if (message.channel.id == "262702429282238465" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/DR", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/DR", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Death Run Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖  Category  ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖   Points   ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖ Victories  ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖Games Played‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" +  
                                    theText(playerA.kills,playerB.kills,"‖   Kills    ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖   Deaths   ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖ K/D  Ratio ‖",true) + "\n" + 
                                    theText(playerA.totalcheckpoints,playerB.totalcheckpoints,"‖Checkpoints ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "grav":
                var divN = 2;
                if (message.channel.id == "335817153603305473" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/GRAV", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/GRAV", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Gravity Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖  Category  ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.points,playerB.points,"‖   Points   ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖ Victories  ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖Games Played‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "cai":
                var divN = 2;
                if (message.channel.id == "262700135644004352" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/CAI", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/CAI", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Cowboys and Indians Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖   Category   ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖    Points    ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖  Victories   ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖ Games Played ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + 
                                    theText(playerA.catches,playerB.catches,"‖   Catches    ‖",true) + "\n" +
                                    theText(playerA.captures,playerB.captures,"‖   Captures   ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.captures/playerA.catches)/100,Math.round(100*playerB.captures/playerB.catches)/100,"‖    Ratio     ‖",true) + "\n" +
                                    theText(playerA.caught,playerB.caught,"‖ Times Caught ‖",false) + "\n" +
                                    theText(playerA.captured,playerB.captured,"‖Times Captured‖",false) + "\n" +
                                    theText(Math.round(100*playerA.captured/playerA.caught)/100,Math.round(100*playerB.captured/playerB.caught)/100,"‖    Ratio     ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "ef":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/EF", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/EF", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Electric FLoor Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖    Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.points,playerB.points,"‖     Points     ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖   Victories    ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖  Games Played  ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + 
                                    theText(playerA.outlived,playerB.outlived,"‖Players Outlived‖",true) + "\n" +
                                    theText(playerA.blocksactivated,playerB.blocksactivated,"‖Blocks Activated‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "sp":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SP", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/SP", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Splegg Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖    Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.points,playerB.points,"‖     Points     ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖   Victories    ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖  Games Played  ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" +  
                                    theText(playerA.eggsfired,playerB.eggsfired,"‖   Eggs Fired   ‖",true) + "\n" +
                                    theText(playerA.blocksdestroyed,playerB.blocksdestroyed,"‖Blocks Destroyed‖",true) + "\n" +
                                    theText(Math.round(100*playerA.blocksdestroyed/playerA.eggsfired)/100,Math.round(100*playerB.blocksdestroyed/playerB.eggsfired)/100,"‖    Accuracy    ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖     Deaths     ‖",false) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "rr":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/RR", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/RR", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Restaurant Rush Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖   Category   ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.points,playerB.points,"‖    Points    ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖  Victories   ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖ Games Played ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + 
                                    theText(playerA.tablescleared,playerB.tablescleared,"‖Tables Cleared‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "oitc":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/OITC", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/OITC", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of One in The Chamber Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖  Category  ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖   Points   ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖ Victories  ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖Games Played‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + 
                                    theText(playerA.kills,playerB.kills,"‖   Kills    ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖   Deaths   ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖ K/D  Ratio ‖",true) + "\n" + 
                                    theText(playerA.arrowsfired,playerB.arrowsfired,"‖Arrows Fired‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "cr":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/CR", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/CR", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Cranked Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖    Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖     Points     ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖   Victories    ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖  Games Played  ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + 
                                    theText(playerA.kills,playerB.kills,"‖     Kills      ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖     Deaths     ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖   K/D  Ratio   ‖",true) + "\n" + 
                                    theText(playerA.rccat_count,playerB.rccat_count,"‖    Cat Uses    ‖",true) + "\n" +
                                    theText(playerA.rccat_kills,playerB.rccat_kills,"‖   Cat  Kills   ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.rccat_kills/playerA.rccat_count)/100,Math.round(100*playerB.rccat_kills/playerB.rccat_count)/100,"‖    Accuracy    ‖",true) + "\n" + 
                                    theText(playerA.airstrike_count,playerB.airstrike_count,"‖Air Strike Uses ‖",true) + "\n" +
                                    theText(playerA.airstrike_kills,playerB.airstrike_kills,"‖Air Strike Kills‖",true) + "\n" +
                                    theText(Math.round(100*playerA.airstrike_kills/playerA.airstrike_count)/100,Math.round(100*playerB.airstrike_kills/playerB.airstrike_count)/100,"‖    Accuracy    ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "hb":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/HB", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/HB", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of The Herobrine Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖   Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.points,playerB.points,"‖    Points     ‖",true) + "\n" +
                                    theText(playerA.kills,playerB.kills,"‖     Kills     ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖    Deaths     ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖   K/D Ratio   ‖",true) + "\n" + 
                                    theText(playerA.captures,playerB.captures,"‖Shards Captured‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "bd":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/BD", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/BD", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Battery Dash Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖    Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖     Points     ‖",true) + "\n" +
                                    theText(playerA.batteries_charged,playerB.batteries_charged,"‖   Victories    ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖  Games Played  ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.batteries_charged/(playerA.games_played-playerA.batteries_charged))/100,Math.round(100*playerB.batteries_charged/(playerB.games_played-playerB.batteries_charged))/100,"‖   W/L  Ratio   ‖",true) + "\n" +
                                    theText(playerA.kills,playerB.kills,"‖     Kills      ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖     Deaths     ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖   K/D  Ratio   ‖",true) + "\n" + 
                                    theText(playerA.energy_collected,playerB.energy_collected,"‖Energy Collected‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "lab":
                var divN = 2;
                if (message.channel.id == "262699939027484674" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/LAB", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/LAB", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of The Lab Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖  Category  ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖   Points   ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖ Victories  ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖Games Played‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "bed":
                var divN = 2;
                if (message.channel.id == "314752337354948608" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/BED", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/BED", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Bed Wars Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖    Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖     Points     ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖   Victories    ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖  Games Played  ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖   W/L  Ratio   ‖",true) + "\n" + 
                                    theText(playerA.kills,playerB.kills,"‖     Kills      ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖     Deaths     ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖   K/D  Ratio   ‖",true) + "\n" + 
                                    theText(playerA.beds_destroyed,playerB.beds_destroyed,"‖ Beds destroyed ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.beds_destroyed/playerA.games_played)/100,Math.round(100*playerB.beds_destroyed/playerB.games_played)/100,"‖Beds  Per  Game ‖",true) + "\n" +
                                    theText(playerA.teams_eliminated,playerB.teams_eliminated,"‖Teams Eliminated‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "sg":
                var divN = 2;
                if (message.channel.id == "262701380597186560" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SG", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/SG", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Survival Games: Classic Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖   Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖    Points     ‖",true) + "\n" +
                                    theText(playerA.most_points,playerB.most_points,"‖  Most Points  ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖   Victories   ‖",true) + "\n" +
                                    theText(playerA.gamesplayed,playerB.gamesplayed,"‖ Games  Played ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.gamesplayed-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.gamesplayed-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" +
                                    theText(playerA.kills,playerB.kills,"‖     Kills     ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖    Deaths     ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖   K/D Ratio   ‖",true) + "\n" +
                                    theText(playerA.deathmatches,playerB.deathmatches,"‖ Deathmatches  ‖",true) + "\n" +
                                    theText(playerA.cratesopened,playerB.cratesopened,"‖ Crates Opened ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.cratesopened/playerA.gamesplayed)/100,Math.round(100*playerB.cratesopened/playerB.gamesplayed)/100,"‖Crates Per Game‖",true) +"```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "sgn":
                var divN = 2;
                if (message.channel.id == "262701380597186560" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SGN", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/SGN", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Survival Games 2.0 Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖   Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖    Points     ‖",true) + "\n" +
                                    theText(playerA.most_points,playerB.most_points,"‖  Most Points  ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖   Victories   ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖ Games  Played ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + 
                                    theText(playerA.kills,playerB.kills,"‖     Kills     ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖    Deaths     ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖   K/D Ratio   ‖",true) + "\n" +
                                    theText(playerA.deathmatches,playerB.deathmatches,"‖ Deathmatches  ‖",true) + "\n" +
                                    theText(playerA.crates_opened,playerB.crates_opened,"‖ Crates Opened ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.crates_opened/playerA.games_played)/100,Math.round(100*playerB.crates_opened/playerB.games_played)/100,"‖Crates Per Game‖",true) +"```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "hero":
                var divN = 2;
                if (message.channel.id == "262701380597186560" || message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/HERO", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/HERO", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Survival Games: Heroes Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖   Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖    Points     ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖   Victories   ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖ Games  Played ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + 
                                    theText(playerA.kills,playerB.kills,"‖     Kills     ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖    Deaths     ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖   K/D Ratio   ‖",true) + "\n" +
                                    theText(playerA.deathmatches,playerB.deathmatches,"‖ Deathmatches  ‖",true) + "\n" +
                                    theText(playerA.crates_opened,playerB.crates_opened,"‖ Crates Opened ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.crates_opened/playerA.games_played)/100,Math.round(100*playerB.crates_opened/playerB.games_played)/100,"‖Crates Per Game‖",true) +"```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, 1));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, 1));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, 1));
                    }
                });
            break;
            case "arcade":
                if (message.channel.type != "dm") {message.delete();}
                message.reply("",
                    {
                            embed: embed("HiveMC Stats Help",
                            "Arcade game codes:\n" +
                            " • Battery Dash - BD\n" +
                            " • Cranked - CR\n" +
                            " • Draw It - DRAW\n" +
                            " • Electric Floor - EF\n" +
                            " • Music Masters - MM\n" +
                            " • One in The Chamber - OITC\n" +
                            " • Restaurant Rush - RR\n" +
                            " • Slaparoo - SLAP\n" +
                            " • Splegg - SP\n" +
                            " • Sploop - SPL\n" +
                            " • Survival Games: Heroes - HERO\n" +
                            " • The Herobrine - HB\n" +
                            "\nUsage: `-compare {Game Code} {Player1} {Player2}`", "blue")
                    }).then(msg => checkDM(msg, message.channel.type, 1));
                break;
            case "pmk":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/PMK", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/PMK", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of PuMpKiNfEcTiOn Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖    Category    ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖     Points     ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖   Victories    ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖  Games Played  ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖ W/L  Ratio ‖",true) + "\n" + 
                                    theText(playerA.kills,playerB.kills,"‖     Kills      ‖",true) + "\n" +
                                    theText(playerA.infections,playerB.infections,"‖   Infections   ‖",false) + "\n" + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "surv":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SURV", function(error, response, body){
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    var playerA = JSON.parse(body);
                    if (playerA.UUID) {
                        req("http://api.hivemc.com/v1/player/" + args[2] + "/SURV", function(error2, response2, body2){
                            if (error2){logging.legacyLog("URGENT HTTP ERROR")}
                            var playerB = JSON.parse(body2);
                            if (playerB.UUID) {
                            
                                message.reply("",
                                {
                                embed: embed("Comparison of Survive The Night Stats of " + args[1] + " and " + args[2],
                                    "```" + statsFormatting(args[1], false) + " ‖     Category     ‖ " + statsFormatting(args[2], true) + "\n" +
                                    theText(playerA.total_points,playerB.total_points,"‖      Points      ‖",true) + "\n" +
                                    theText(playerA.victories,playerB.victories,"‖    Victories     ‖",true) + "\n" +
                                    theText(playerA.games_played,playerB.games_played,"‖   Games Played   ‖",true) + "\n" +
                                    theText(Math.round(100*playerA.victories/(playerA.games_played-playerA.victories))/100,Math.round(100*playerB.victories/(playerB.games_played-playerB.victories))/100,"‖    W/L  Ratio    ‖",true) + "\n" +
                                    theText(playerA.kills,playerB.kills,"‖      Kills       ‖",true) + "\n" +
                                    theText(playerA.deaths,playerB.deaths,"‖      Deaths      ‖",false) + "\n" +
                                    theText(Math.round(100*playerA.kills/playerA.deaths)/100,Math.round(100*playerB.kills/playerB.deaths)/100,"‖    K/D  Ratio    ‖",true) + "\n" + 
                                    theText(playerA.generators_powered,playerB.generators_powered,"‖Generators Powered‖",true) + "\n" +
                                    theText(playerA.looted_crates,playerB.looted_crates,"‖  Looted  Crates  ‖",true) + "```", "gold")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                            }else{
                                message.reply("",
                                 {
                                    embed: embed("Error", "An error occured. Maybe you misspelled second player's name?", "red")
                                }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                        });
                    }else{
                        message.reply("",
                         {
                            embed: embed("Error", "An error occured. Maybe you misspelled first player's name?", "red")
                        }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            default:
                if (message.channel.type != "dm") {message.delete();}
                message.reply("",
                    {
                        embed: embed("HiveMC Gamemode Shortcut Help",
                            "Available Gamemodes: \n" +
                            " • Block Party - BP\n" +
                            " • Bed Wars - BED\n" +
                            " • Cowboys and Indians - CAI\n" +
                            " • DeathRun - DR\n" +
                            " • Gravity - GRAV\n" +
                            " • Hide and Seek - HIDE\n" +
                            " • Murder in Mineville - MIMV\n" +
                            " • PuMpKiNfEcTiOn - PMK\n" +
                            " • SkyGiants - GNT\n" +
                            " • SkyGiants: Mini - GNTM\n" +
                            " • Sky Wars - SKY\n" +
                            " • Survival Games - SG\n" +
                            " • Survival Games 2.0 - SGN\n" +
                            " • The Lab - LAB\n" +
                            " • Trouble in Mineville - TIMV\n" +
                            "For Arcade game codes use `-compare Arcade`\n" +
                            "\nUsage: `-compare {Game Code} {Player1} {Player2}`", "blue")
                    }).then(msg => checkDM(msg, message.channel.type, 1));
                break;
        }
    }
    }
};
