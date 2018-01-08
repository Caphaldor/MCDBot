module.exports = {
    description: "Providing instructions for verification & user authentication.",
    usage: "-verify",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        message.reply("Please follow these simple steps to verify your MC account" +
            "\n 1. Open Minecraft, and join `caphaldor.com` over in the Multiplayer menu. You **need** to use Minecraft __1.12.1__ to connect." +
            "\n 2. You will get kicked with a token. Each token is valid for 2 minutes, note it down if you have to." +
            "\n 3. Reply to this message with `-token YOUR_TOKEN`." +
            "\n*For example, if your token is \"1234\" you just have to respond with `-token 1234`*" +
            "\n\n And you should be done! Enjoy your stay!");
    }
};
