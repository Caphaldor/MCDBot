module.exports = {
    description: "Shuts down BeeBot 2.0, effectively restarting it",
    usage: "-shutdown",
    allowedInDM: false,
    allowedChannels: ["274488503243636737"],
    call: function(message, args){
        logging.log("SHUTDOWN SCHEDULED", "Shutting down in 5 seconds...", "blue");
        setTimeout(shutdown, 5000);
    }
};
//shutdown function
function shutdown() {
    //destroy discord connection
    bot.destroy();
    //end this node instance; waiting for PM2's service manager to start it up again
    process.exit(1337);
}
