module.exports = {
    description: "Command used to guess the current challenge.",
    usage: "-guess <guess>",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        if (args[0] && args[0].toLowerCase() == config.gameToken) {
            message.reply("Congrats, you solved it!");
            logging.log(message.author.username + " guessed the word!", message.author.username + " did it! <@155963500265603072> <@98153298237857792> <@142314965695594496>", "green");

            bot.channels.get("269176484248289280").sendMessage("<@" + message.author.id + "> solved the current challenge." + " Congratulations!")
            .catch(function () {
                console.log("Error in posting to the channel.");
            });
        } else {
            message.reply("Wrong! Try again.");
            logging.log("Failed guess by " + message.author.username, "They tried " + args.join(' ') + ", " + "but it was wrong.", "red");
        }
    }
};
