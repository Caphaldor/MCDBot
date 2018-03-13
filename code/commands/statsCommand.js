function checkDM(msg, DM, div) {
    if (DM != "dm") {
        msg.delete(30000/div);
    }
};
function hideTimeAlive(hiveData) {
    var temp = "";
    if (Math.abs(hiveData.timealive)<13302000) {
        temp = "\'s time alive is: " + Math.floor(hiveData.timealive/86400) + " d. " + Math.floor((hiveData.timealive%86400)/3600) + " h, " + Math.floor((hiveData.timealive%3600)/60) + " min and " + Math.floor(hiveData.timealive%60) + " s";
    } else {
        var newTimeAlive;
        newTimeAlive = hiveData.total_points - 30*hiveData.seekerkills - 50*hiveData.victories;
        if (newTimeAlive>3600 && newTimeAlive<4320000) {
            temp = "\'s time alive is ≈" + Math.floor(newTimeAlive/86400) + " days and " + Math.floor((newTimeAlive%86400)/3600) + " hours\n*This time has been estimated and may not be fully accurate*";
        } else {
            temp = "*\'s time alive is glitched :(*";
        }
    }
    return temp;
}
module.exports = {
    description: "Provides statistics for a specified user on the Hive.\nFor list of available Main Game Codes, type \"-stats list\" \nFor list of available Arcade Game Codes, type \"-stats arcade\"",
    usage: "-stats {Game Code} {Player}",
    allowedInDM: true,
    allowedChannels: [config.settings.allowedChannels],
    call: function(message, args){
        if (args[0]==undefined) {
            if (message.channel.type != "dm") {message.delete(30000);}
            message.reply("The proper usage for the command is: " +
            "\n-stats {Game Code} {Player}"+
            "\nFor list of available Main Game Codes, type \"-stats list\""+
            "\nFor list of available Arcade Game Codes, type \"-stats arcade\"").then(msg => checkDM(msg, message.channel.type,1));
        }else{
        switch (args[0].toLowerCase()) {
            case "gnt":
                var divN = 2;
                if (message.channel.id == "262700752613539840" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/GNT", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("SkyGiants stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.games_played +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Gold Earned:** " + hiveData.gold_earned +
                                    "\n**Beasts Slain:** " + hiveData.beasts_slain +
                                    "\n**Shutdowns:** " + hiveData.shutdowns, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "gntm":
                var divN = 2;
                if (message.channel.id == "262700752613539840" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/GNTM", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error) {
                        logging.legacyLog("URGENT HTTP ERROR")
                    }
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID) {
                        message.reply("",
                            {
                                embed: embed("SkyGiants: Mini Stats of " + args[1],
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.games_played +
                                    "\n**Kills:** " + hiveData.kills +
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Gold Earned:** " + hiveData.gold_earned +
                                    "\n**Beasts Slain:** " + hiveData.beasts_slain +
                                    "\n**Shutdowns:** " + hiveData.shutdowns, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    } else {
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "spl":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SPL", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        var raven = hiveData.character_stats.RavenCharacter ? "\n**Raven:** " + (Math.round(100*(hiveData.character_stats.RavenCharacter.kills/hiveData.character_stats.RavenCharacter.deaths))/100) : "";
                        var oinky = hiveData.character_stats.OinkyCharacter ? "\n**Oinky:** " + (Math.round(100*(hiveData.character_stats.OinkyCharacter.kills/hiveData.character_stats.OinkyCharacter.deaths))/100) : "";
                        var booster = hiveData.character_stats.BoosterCharacter ? "\n**Booster:** " + (Math.round(100*(hiveData.character_stats.BoosterCharacter.kills/hiveData.character_stats.BoosterCharacter.deaths))/100) : "";
                        var torstein = hiveData.character_stats.TorsteinCharacter ? "\n**Torstein:** " + (Math.round(100*(hiveData.character_stats.TorsteinCharacter.kills/hiveData.character_stats.TorsteinCharacter.deaths))/100) : "";
                        message.reply("",
                            {
                                embed: embed("Sploop stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.games_played +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Blocks Painted:** " + hiveData.blocks_painted +
                                    "\n**Ultimates Earned:** " + hiveData.ultimates_earned +
                                    "\n**Characters K/D Ratios:** " +
                                    oinky +
                                    raven +
                                    booster +
                                    torstein, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "draw":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/DRAW", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("DrawIt stats of " + args[1],
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Correct Guesses:** " + hiveData.correct_guesses +
                                    "\n**Incorrect Guesses:** " + hiveData.incorrect_guesses +
                                    "\n**Total Guesses:** " + (hiveData.correct_guesses+hiveData.incorrect_guesses) +
                                    "\n**Skips:** " + hiveData.skips, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "bp":
                var divN = 2;
                if (message.channel.id == "262703646452613120" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/BP", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Block Party stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.games_played +
                                    "\n**Placings:** " + hiveData.total_placing +
                                    "\n**Elimiations:** " + hiveData.total_eliminations, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "sky":
                var divN = 2;
                if (message.channel.id == "262701246559944704" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SKY", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        var timeAlive = "\n`" + args[1] + "`\'s time alive is: " + Math.floor(hiveData.timealive/86400) + " d. " + Math.floor((hiveData.timealive%86400)/3600) + " h, " + Math.floor((hiveData.timealive%3600)/60) + " min and " + Math.floor(hiveData.timealive%60) + " s";
                        message.reply("",
                            {
                                embed: embed("Sky Wars stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Most Points:** " + hiveData.most_points +
                                    timeAlive, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "slap":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SLAP", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Slaparoo stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Slap-Offs:** " + hiveData.kills +
                                    "\n**Deaths:** " + hiveData.deaths, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "timv":
                var divN = 2;
                if (message.channel.id == "262703696306110477" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/TIMV", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Trouble in Mineville stats of `" + args[1] + "`",
                                    "**Karma:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Role Points:** " + hiveData.role_points +
                                    "\n**Most Karma:** " + hiveData.most_points +
                                    "\n**Traitor Points:** " + hiveData.t_points+
                                    "\n**Innocent Points:** " + hiveData.i_points +
                                    "\n**Detective Points:** " + hiveData.d_points, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "mimv":
                var divN = 2;
                if (message.channel.id == "262703696306110477" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/MIMV", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Murder in Mineville stats of `" + args[1] + "`",
                                    "**Karma:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Games played:** " + hiveData.games_played +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "hide":
                var divN = 2;
                if (message.channel.id == "262699631123759106" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/HIDE", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Hide and Seek stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Hiders Killed:** " + hiveData.seekerkills +
                                    "\n**Seekers Killed:** " + hiveData.hiderkills +
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n`" + args[1] + "`" + hideTimeAlive(hiveData), "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "dr":
                var divN = 2;
                if (message.channel.id == "262702429282238465" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/DR", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("DeathRun stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.games_played +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Checkpoints:** " + hiveData.totalcheckpoints, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "grav":
                var divN = 2;
                if (message.channel.id == "335817153603305473" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/GRAV", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Gravity stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "cai":
                var divN = 2;
                if (message.channel.id == "262700135644004352" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/CAI", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Cowboys and Indians stats of " + args[1],
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Leaders Caught:** " + hiveData.catches +
                                    "\n**Leaders Captured:** " + hiveData.captures +
                                    "\n**Times Caught:** " + hiveData.caught +
                                    "\n**Times Captured:** " + hiveData.captured, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "ef":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/EF", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Electric Floor stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Players Outlived:** " + hiveData.outlived+
                                    "\n**Blocks Activated:** " + hiveData.blocksactivated, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "sp":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SP", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        var timeAlive = "\n`" + args[1] + "`\'s time alive is: " + Math.floor(hiveData.timealive/86400) + " d. " + Math.floor((hiveData.timealive%86400)/3600) + " h, " + Math.floor((hiveData.timealive%3600)/60) + " min and " + Math.floor(hiveData.timealive%60) + " s";
                        message.reply("",
                            {
                                embed: embed("Splegg stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Eggs Fired:** " + hiveData.eggsfired +
                                    "\n**Blocks Destroyed:** " + hiveData.blocksdestroyed +
                                    "\n**Deaths:** " + hiveData.deaths +
                                    timeAlive, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "rr":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/RR", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Restaurant Rush stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Tables Cleared:** " + hiveData.tablescleared, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "oitc":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/OITC", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("One in The Chamber stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Arrows Fired:** " + hiveData.arrowsfired, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "mm":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/MM", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Music Masters stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Incorrect Notes:** " + hiveData.incorrectnotes +
                                    "\n**Correct Notes:** " + hiveData.correctnotes +
                                    "\n**Perfect Notes:** " + hiveData.notes_perfect +
                                    "\n**Good Notes:** " + hiveData.notes_good, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "cr":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/CR", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Cranked stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Cat Uses:** " + hiveData.rccat_count +
                                    "\n**Cat Kills:** " + hiveData.rccat_kills +
                                    "\n**Air Strike Uses:** " + hiveData.airstrike_count +
                                    "\n**Air Strike Kills:** " + hiveData.airstrike_kills +
                                    "\n**Sonic Squid Uses:** " + hiveData.sonicsquid_count +
                                    "\n**Sonic Squid Kills:** " + hiveData.sonicsquid_kills, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "hb":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/HB", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("The Herobrine stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.points + " (" + hiveData.title + ")" +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Shards Captured:** " + hiveData.captures, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "bd":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/BD", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Battery Dash stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.batteries_charged +
                                    "\n**Games Played:** " + hiveData.games_played +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Energy Collected:** " + hiveData.energy_collected, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "lab":
                var divN = 2;
                if (message.channel.id == "262699939027484674" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/LAB", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("The Lab stats of `" + args[1] + "`",
                                    "**Atoms:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "sg":
                var divN = 2;
                if (message.channel.id == "262701380597186560" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SG", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        var timeAlive = "\n`" + args[1] + "`\'s time alive is: " + Math.floor(hiveData.timealive/86400) + " d. " + Math.floor((hiveData.timealive%86400)/3600) + " h, " + Math.floor((hiveData.timealive%3600)/60) + " min and " + Math.floor(hiveData.timealive%60) + " s";
                        message.reply("",
                            {
                                embed: embed("Survival Games stats of `" +args[1] + "`",
                                    "**Points:** " + hiveData.total_points +
                                    "\n**Most Points:** " + hiveData.most_points +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.gamesplayed +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Deathmatches:** " + hiveData.deathmatches +
                                    "\n**Crates Opened:** " + hiveData.cratesopened +
                                    timeAlive, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "hero":
                var divN = 2;
                if (message.channel.id == "262701380597186560" || message.channel.id == "CHANNEL" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/HERO", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("SG: Heroes stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.games_played +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**One vs One Wins:** " + hiveData.one_vs_ones_wins +
                                    "\n**Deathmatches:** " + hiveData.deathmatches +
                                    "\n**Crates Opened:** " + hiveData.crates_opened, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "sgn":
                var divN = 2;
                if (message.channel.id == "262701380597186560" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SGN", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Survival Games 2.0 stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Most Points:** " + hiveData.most_points +
                                    "\n**Games Played:** " + hiveData.games_played +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Deathmatches:** " + hiveData.deathmatches +
                                    "\n**Crates Opened:** " + hiveData.crates_opened, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "bed":
                var divN = 2;
                if (message.channel.id == "314752337354948608" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/BED", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Bed Wars stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.games_played +
                                    "\n**Kills:** " + hiveData.kills+
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Beds Destroyed:** " + hiveData.beds_destroyed +
                                    "\n**Team Eliminations:** " + hiveData.teams_eliminated, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
                break;
            case "arcade":
                var divN = 2;
                if (message.channel.id == "262700708925669376" || message.channel.id == "281725164247449600") {divN = 1;}
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
                            "\nUsage: `-stats {Game Code} {Player}`", "blue")
                    }).then(msg => checkDM(msg, message.channel.type, divN));
                break;
            case "pmk":
                var divN = 2;
                if (message.channel.id == "314752337354948608" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/PMK", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("PuMpKiNfEcTiOn stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.games_played +
                                    "\n**Infections:** " + hiveData.infections+
                                    "\n**Kills:** " + hiveData.kills, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            case "surv":
                var divN = 2;
                if (message.channel.id == "314752337354948608" || message.channel.id == "281725164247449600") {divN = 1;}
                if (message.channel.type != "dm") {message.delete();}
                req("http://api.hivemc.com/v1/player/" + args[1] + "/SURV", function (error, response, body) {
                    //in case Hive's API has issues
                    if (error){logging.legacyLog("URGENT HTTP ERROR")}
                    //get Hive's response
                    var hiveData = JSON.parse(body);
                    if (hiveData.UUID){
                        message.reply("",
                            {
                                embed: embed("Survive The Night stats of `" + args[1] + "`",
                                    "**Points:** " + hiveData.total_points + " (" + hiveData.title + ")" +
                                    "\n**Victories:** " + hiveData.victories +
                                    "\n**Games Played:** " + hiveData.games_played +
                                    "\n**Kills:** " + hiveData.kills +
                                    "\n**Deaths:** " + hiveData.deaths +
                                    "\n**Generators Powered:** " + hiveData.generators_powered +
                                    "\n**Looted Crates:** " + hiveData.looted_crates, "gold","https://crafatar.com/renders/body/"+ hiveData.UUID.toString() +"?overlay", "https://hivemc.com/player/" + args[1])
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured.\nMaybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type, divN));
                    }
                });
            break;
            default:
                var divN = 2;
                if (message.channel.type != "dm") {message.delete();}
                message.reply("",
                    {
                        embed: embed("HiveMC Stats Help",
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
                            "For Arcade game codes use `-stats Arcade`\n" +
                            "\nUsage: `-stats {Game Code} {Player}`", "blue")
                    }).then(msg => checkDM(msg, message.channel.type, divN));
                break;
        }
    }
    }
};
