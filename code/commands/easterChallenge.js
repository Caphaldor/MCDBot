module.exports = {
    description: "Command used to guess the Easter challenge.",
    usage: "-guess <guess>",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        switch (args[0].toLowerCase()) {
            case "what" :
                message.reply("Oh right! I'm starting to remember... There is this one minigame I really like, maybe it can help. Can you guess which one it is?");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 1", "green");
            break;
            case "oitc" :
                message.reply("Ah, yes, that was it! I'm really good at aiming you know. I'm also good at Block Party, Death Run, The Lab and Mineville games.\n Only problem I get bored quickly, right after starting...");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 2" ,"green");
            break;
            case "drum" :
                message.reply("You like music? So do I! I have a favorite producer too, can you guess who they are?");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 3", "green");
            break;
            case "waterflame" :
                message.reply("Yes, I love them! Wait... I remember now! In between places, a water message is hidden. Your hint:\n`4_1_3_2`")
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 4, and recieved the hint.", "green")
                message.reply("**Message from BeeBot Developers**\nCongratulations on getting so far! Sadly, the next step to the puzzle is no longer solvable. If you have any ideas on future steps, feel free to tell us in #general!");
            break;
            case "dog_cat_bird_fish" :
                message.reply("Congratulations, you solved it!");
                logging.log(message.author.username + " solved the Easter puzzle!", message.author.username + " did it! <@155963500265603072> <@98153298237857792> <@142314965695594496>", "green");
                bot.channels.get("269176484248289280").sendMessage("<@" + message.author.id + "> solved the Easter Puzzle! Congratulations!")
                .catch(function () {
                    console.log("Error in posting to the channel.");
                });
            break;
            default:
                message.reply("Wrong! Try again.");
                logging.log("Failed guess by " + message.author.username, "They tried " + args.join(' ') + ", " + "but it was wrong.", "red");
            break;
        }
    }
};
