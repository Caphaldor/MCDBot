module.exports = {
    log: function (title, msg, color, channel) {
        var cID = "274488503243636737";
        if(channel == "rulebreakers"){cID = "269526879759761408";}
        bot.channels.get(cID).send("", {
            embed: embed(title, msg, color)
        }).catch(function () {
            console.log("Error whilst attempting to log something.");
        });
    },
    legacyLog: function (msg) {
        bot.channels.get("274488503243636737").send(msg).catch(function () {
            console.log("Error whilst attempting to (legacy) log something.");
        });
    }
};