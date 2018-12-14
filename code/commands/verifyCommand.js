module.exports = {
    description: "Provides instructions for verification & user authentication.",
    usage: "-verify",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        message.reply("If you're on Bedrock Edition (Win10/Phones/XBOX/Nintendo) simply use the command `-toggle bedrock`. If you're a Java player, you can verify with the following steps:\n" +
            "\n 1. Open Minecraft, and join `caphaldor.com` over in the Multiplayer menu. You **need** to use Minecraft __1.12.2__ to connect." +
            "\n 2. You will get kicked with a token. Each token is valid for 2 minutes, note it down if you have to." +
            "\n 3. Reply to this message with `-token YOUR_TOKEN`." +
            "\n*For example, if your token is \"1234\" you just have to respond with `-token 1234`*" +
            "\n\n And you should be done! Enjoy your stay!");
    }
};
