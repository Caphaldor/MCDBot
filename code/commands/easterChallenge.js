module.exports = {
    description: "Command used to guess the Easter challenge.",
    usage: "-guess {guess}",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        switch (args.join(' ').toLowerCase()) {
            case "train" :
                message.reply("`Day 2:` *The train worked well, but it broke down in some small town south of Mineville. Thankfully, the Johnson family helped out, but they're absolutely crazy! They own a bookstore in town, and spend their entire monthly salary on tacos! At least they let me stay at their house for a couple of days, but I never did figure out just how many tacos they could afford...*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 1", "green");
            break;
            case "600" :
                message.reply("`Day 3:` *I saw an actual rainbow today! I was listening to the sounds of one Glorious Morning when I noticed it, but it looked a little off. The color order was different, and there were more of them...*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 2" ,"green");
            break;
            case "red blue green cyan pink magenta gray yellow black purple" :
                message.reply("`Day 4:` *I went out for some dancing last night, and oh boy what a night it was. We partied until the dawn, non stop! Thinking about it, I don't even know how I got back here! It's all just a red blur...*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 3", "green");
            break;
            case "em84ll1n4" :
                message.reply("`Day 5:` *I had trouble resting today. The constant fighting up in the sky makes it impossible to sleep. I wish I knew what all the commotion was about...*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 4", "green");
            break;
            case "lemon tree" :
                message.reply("`Day 6:` *I have decided to go up and see what's with all the fighting, but by the time I got there the warriors seemed afraid of something. They're talking about otherworldly shadows on the other island. I'm surprised they're still able to relax in their ponds with such a threat. The curiosity is killing me, I have to go and see myself what it was...*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 5", "green");
            break;
            case "kobalos" :
                message.reply("`Day 7:` *I do not know what it was, but I know I don't want anything to do with it. I've been running away all day. I've seen clues, spread around the jungle, pointing me into some direction, if I only had the time to see where they were...*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 6", "green");
            break;
            case "spawn parkour fire water roots" :
                message.reply("`Day 8:` *I think I ran away far enough. I set up a campfire for the night, but I'm not sure if this is a good location - it seems very popular...*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 7", "green");
            break;
            case "blackhorse basin" :
                message.reply("`Day 9 I think?:` *I knew I shouldn't have let my guard down. One moment I'm lying down by the fire, the next some madman kidnaps me! But I have a plan to get out, I'll have to act quickly, regenerating my strength on the go as I jump out of this facility. Won't be easy, but I'm sure I can find things to fuel my escape...*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 8", "green");
            break;
            case "soda burger beer slime" :
                message.reply("`Day 10:` *After successfully escaping the facility, I decided to settle at a new location. I hadn't expected to see this place so busy, nonetheless it was an exciting adventure. I have found temporary refuge in some mill, but I am again unable to fall asleep. This village looked peacefull, yet I hear non-stop music playing. Where is it coming from?*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 9.", "green");
            break;
            case "altar jukebox" :
                message.reply("Congratulations, you solved the puzzle!");
                logging.log(message.author.username + " solved the Easter puzzle! ", message.author.username + " did it! <@155963500265603072> <@133256750567522306>", "green");
                bot.channels.get("269176484248289280").sendMessage("<@" + message.author.id + "> solved the Easter Puzzle! Congratulations!")
                .catch(function () {
                    console.log("Error in posting to the channel.");
                });
            break;
            default:
                message.reply("That's not it, try again.");
                logging.log("Failed guess by " + message.author.username, "They tried:\n" + args.join(' '), "red");
            break;
        }
    }
};
