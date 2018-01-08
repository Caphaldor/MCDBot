//function whatToDo(msg, arg, aThing) {
//    var temp = true;
//    if (aThing == true) {
//        msg.reply(config.arg);
//    }
//}
module.exports = {
    description: "Edits the config file.",
    usage: "-config",
    allowedInDM: false,
    allowedChannels: ["274488503243636737"],
    call: function(message, args){
        //thingy checks whether we overwrite (false) or output value (true)
        var thingy = false;
        if (args[0]=="output") {
            message.reply(config.tester);
        }
        if (args[0]=="save") {
            message.reply("doing the thing");
            config.tester = "We did it";
            message.reply("I don did the thing");
        }
//        whatToDo(message, arg[0], thingy);
    }
};