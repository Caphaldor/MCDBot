function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    switch (date%10) {
        case 1:
        var dateEnd = "st";
        break;
        case 2:
        var dateEnd = "nd";
        break;
        case 3:
        var dateEnd = "rd";
        break;
        default:
        var dateEnd = "th";
        break;
    }
    var hour = a.getHours();
    var min = a.getMinutes();
    if (min<10) {
        min = "0" + min;
    }
    var time = date + dateEnd + " of " + month + ", " + year + " at " + hour + ":" + min + " GMT";
    return time;
}
function checkDM(msg, DM) {
    if (DM != "dm") {
        msg.delete(30000);
    }
};
module.exports = {
    description: "Providing information about a given player.",
    usage: "-player {Player}",
    allowedInDM: true,
    allowedChannels: ["281725164247449600"],
    call: function(message, args){
        if (message.channel.type != "dm") {message.delete();}
        if (args[0]==undefined) {
            message.reply("The proper usage for the command is:\n" +
            "-player {Player}\n" +
            "*`{Player}` can be either the IGN or the UUID of a player*").then(msg => checkDM(msg, message.channel.type));
        }else{
            req("http://api.hivemc.com/v1/player/" + args[0], function (error, response, body) {
                if (error){logging.legacyLog("URGENT HTTP ERROR")}
                var hiveData = JSON.parse(body);
                if (hiveData.UUID){
                    var color = "green";
					var onlineCheck = "";
                    if (hiveData.status.description == "Currently hibernating in") {
                        color = "gray";
						onlineCheck = "\n`" + hiveData.username + "` was last seen online on the " + timeConverter(hiveData.lastLogout)
                    }
                    message.reply("",
                    {
                        embed: embed(hiveData.username + " is " + hiveData.status.description.toLowerCase() + " " + hiveData.status.game,
                            "**Rank**: " + hiveData.modernRank.human +
                            "\n**Tokens**: " + hiveData.tokens +
                            "\n**Lucky Crates Owned**: " + hiveData.crates +
                            "\n**Golden Medals Collected**: " + hiveData.medals +
                            "\n`" + hiveData.username + "` has " + Object.keys(hiveData.achievements).length + " Global Achievements and " + hiveData.trophies.length + " trophies" +
                            "\n`" + hiveData.username + "` has first logged on the " + timeConverter(hiveData.firstLogin) + 
							onlineCheck, color, "https://crafatar.com/avatars/" + hiveData.UUID + "?overlay", "https://hivemc.com/player/" + hiveData.username)
                    }).then(msg => checkDM(msg, message.channel.type));
                }else{
                        message.reply("",
                            {
                                embed: embed("Error",
                                    "An error occured. Maybe you misspelled the player's name?", "red")
                             }).then(msg => checkDM(msg, message.channel.type));
                }
            });
        }
    }
};