module.exports = {
    description: "Use this to get small hints as to locations of all the ghosts",
    usage: "-hint {#}",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        switch (args.join(' ').toLowerCase()) {
            case "1" :
                message.reply("Where all adventures begin...");
            break;
            case "2" :
                message.reply("It's the Great _, Charlie Brown!");
            break;
            case "3" :
                message.reply("Where does Night of the Living Dead begin?");
            break;
            case "4" :
                message.reply("Mine. Prepare. Fight!);
            break;
            case "5" :
                message.reply("Witch ghost are you looking for?");
            break;
            case "6" :
                message.reply("This one's rather sticky");
            break;
            case "7" :
                message.reply("Locked away");
            break;
            case "8" :
                message.reply("\"Of all the trees we could've hit, we got to get one that hits back.\"");
            break;
            case "9" :
                message.reply("Dark Tower");
            break;
            case "10" :
                message.reply("Perkins, who's that?");
            break;
            case "11" :
                message.reply("A certain monkey is hiding a dark secret...");
            break;
            case "12" :
                message.reply("Where all adventures begin...");
            break;
            case "13" :
                message.reply("\"It's a me, Mario!\"");
            break;
            case "14" :
                message.reply("Howdy there, ghost partner");
            break;
            default:
                message.reply("Use `-hint {#}`, replacing # with a number between 1 and 14 to get hints for all the various ghosts!");
            break;
        }
    }
};
