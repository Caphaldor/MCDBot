module.exports = {
    description: "Command used to create polls",
    usage: "-polls",
    allowedInDM: false,
    allowedChannels: ["274488503243636737"],
    call: function(message, args){
        bot.channels.get("274488503243636737").send("Just a poll test");
    }
};