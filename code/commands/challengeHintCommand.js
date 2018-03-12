module.exports = {
    description: "Provides the hint for the current challenge.",
    usage: "-hint",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        message.reply(config.hint);
    }
};