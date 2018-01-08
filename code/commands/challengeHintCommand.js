module.exports = {
    description: "Providing the current hint for the challenge.",
    usage: "-hint",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        message.reply(config.hint);
    }
};