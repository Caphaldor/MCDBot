module.exports = {
    description: "Provides help for all public BeeBot 2.0 commands",
    usage: "-help command",
    allowedInDM: true,
    allowedChannels: ["281725164247449600","274488503243636737"],
    call: function(message, args){
        if (message.channel.id == "281725164247449600") {
         if (args[0]==undefined) {
              message.reply("",
                    {
                        embed: embed("Command list",
                        "Available commands:\n" +
                        "`-help` - Shows available commands\n" +
                        "`-stats` - Views Players statistics from The Hive\n" +
                        "`-leaderboard` - Views Player position on a games leaderboard\n" +
                        "`-times` - Views Players Death Run Map Records\n" +
                        "`-player` - Views information about a Player\n" +
                        "`-compare` - Compare statistics of two players in any gamemode\n" +
                        "Use `-help {Command}` for more information on usage.\n" +
                        "\n*More commands available via Direct Messages*", "blue")
                    });
         } else {
            switch (args[0].toLowerCase()) {
            case "help":
                message.reply("",
                    {
                        embed: embed("-help command help",
                        "Provides help for all available commands\n" +
                        "Usage:\n" +
                        "`-help` - provides a list of all commands" +
                        "`-help {Command}` - Provides help for a specific command", "white")
                    });
                break;
            case "leaderboard":
                message.reply("",
                    {
                        embed: embed("-ldb command help",
                        "Provides live data from Hive's leaderboards.\nNOTE: Certain leaderboards do not display properly. We are working on fixing what we can,  but some issues come from the API.\n" +
                        "Usage:\n" +
                        "`-leaderboard {Game Code} {Player/Position}` - Provides the leaderboard for a specifid player, or one taking specified position\n" +
                        "`-stats list` Will provide you with all of the game codes", "white")
                    });
                break;
            case "times":
                message.reply("",
                    {
                        embed: embed("-times command help",
                        "ProvidesCurrent Death Run Map Records for a player\n" +
                        "Usage:\n" +
                        "`-times {Player} [#]`- Provides a page from the list of all maps and the players record times.", "white")
                    });
                break;
            case "player":
                message.reply("",
                    {
                        embed: embed("-player command help",
                        "Provides information on a player. Bar on the left will be green if the player is online, gray if they're offline.\n" +
                        "Usage:\n" +
                        "`-player {Player}` - Provides information on the specified IGN/UUID", "white")
                    });
                break;
            case "compare":
                message.reply("",
                    {
                        embed: embed("-compare command help",
                        "Compares the statistics of two players in any gamemode\n" +
                        "Usage:\n" +
                        "`-compare {GameCode} {Player1} {Player2}` - Compares stats of the two specified players in the specified gamemode\n" +
                        "`-compare list` - Provides a list of GameCodes for all the main gamemodes\n" +
                        "`-compare arcade` - Provides a list of GameCodes for all Arcade Games", "white")
                    });
                break;
            case "stats":
                message.reply("",
                    {
                        embed: embed("-stats command help",
                        "Provides live data from HiveMC Minigames\n" +
                        "Usage:\n" +
                        "`-stats help` - provides a list of all available main gamemodes\n" +
                        "`-stats arcade` - provides a list of all available arcade gamemodes\n" +
                        "`-stats {Game Code} {Player Nick}` - Provides data for a specific minigame for a specific user", "white")
                    });
                break;
            default:
                message.reply("",
                    {
                        embed: embed("Command list",
                        "Available commands:\n" +
                        "`-help` - Shows available commands\n" +
                        "`-stats` - Views Players statistics from The Hive\n" +
                        "Use `-help {Command}` for more information on usage.\n" +
                        "\n*More commands available via Direct Messages*", "blue")
                    });
                break;
            }
        }}else if (message.channel.type == "dm") {
         if (args[0]==undefined) {
              message.reply("",
                    {
                        embed: embed("Command list",
                        "Available commands:\n" +
                        "`-guess` - Used to guess the current Riddle\n" +
                        "`-help` - Shows available commands\n" +
                        "`-hint` - Provides the hint for the current Riddle\n" +
                        "`-leaderboard` - Provides leaderboard information\n" +
                        "`-stats` - Views Players statistics from The Hive\n" +
                        "`-times` - Provides Death Run Map Records\n" +
                        "`-player` - Views information about a Player\n" +
                        "`-compare` - Compares stats of two players in any gamemode\n" +
                        "`-token` - Used to verify your minecraft account\n" +
                        "`-verify` - Provides instructions on how to verify your minecraft account\n" +
                        "Use `-help {Command}` for more information on usage.\n", "blue")
                    });
         } else {
             switch (args[0].toLowerCase()) {
            case "guess":
                message.reply("",
                    {
                        embed: embed("-guess command help",
                        "Used to guess the current Riddle, hint available via -hint\n" +
                        "Being first to solve the current riddle wins the privilage of making the next riddle\n" +
                        "Usage:\n" +
                        "`-guess {WORD}` - Checks whether the WORD guessed is the solution to the riddle", "white")
                    });
                break;
            case "help":
                message.reply("",
                    {
                        embed: embed("-help command help",
                        "Provides help for all available commands\n" +
                        "Usage:\n" +
                        "`-help` - provides a list of all commands" +
                        "`-help {Command}` - Provides help for a specific command", "white")
                    });
                break;
            case "hint":
                message.reply("",
                    {
                        embed: embed("-hints command help",
                        "Provides the hint for the current riddle\n" +
                        "Usage:\n" +
                        "`-hint` - Gives the current hint", "white")
                    });
                break;
            case "stats":
                message.reply("",
                    {
                        embed: embed("-stats command help",
                        "Provides live data from HiveMC Minigames\n" +
                        "Usage:\n" +
                        "-stats help - provides a list of all available main gamemodes\n" +
                        "-stats arcade - provides a list of all available arcade gamemodes\n" +
                        "-stats {Game Code} {Player Nick} - Provides data for a specific minigame for a specific user", "white")
                    });
                break;
            case "leaderboard":
                message.reply("",
                    {
                        embed: embed("-ldb command help",
                        "Provides live data from Hive's leaderboards.\nNOTE: Certain leaderboards do not display properly. We are working on fixing what we can,  but some issues come from the API.\n" +
                        "Usage:\n" +
                        "`-leaderboard {Game Code} {Player/Position}` - Provides information on a specified player or a specified position on a leaderboard\n" +
                        "`-stats list` Will provide you with all of the game codes", "white")
                    });
                break;
            case "player":
                message.reply("",
                    {
                        embed: embed("-player command help",
                        "Provides information on a player. Bar on the left will be green if the player is online, gray if they're offline.\n" +
                        "Usage:\n" +
                        "`-player {Player}` - Provides information on the specified IGN/UUID", "white")
                    });
                break;
            case "compare":
                message.reply("",
                    {
                        embed: embed("-compare command help",
                        "Compares the statistics of two players in any gamemode\n" +
                        "Usage:\n" +
                        "`-compare {GameCode} {Player1} {Player2}` - Compares stats of the two specified players in the specified gamemode\n" +
                        "`-compare list` - Provides a list of GameCodes for all the main gamemodes\n" +
                        "`-compare arcade` - Provides a list of GameCodes for all Arcade Games", "white")
                    });
                break;
            case "times":
                message.reply("",
                    {
                        embed: embed("-times command help",
                        "ProvidesCurrent Death Run Map Records for a player\n" +
                        "Usage:\n" +
                        "`-times {Player} [#]`- Provides a page from the list of all maps and the players record times.", "white")
                    });
                break;
            case "token":
                message.reply("",
                    {
                        embed: embed("-token command help",
                        "Allows users to manually verify their rank on TheHive with a generated token.\n" +
                        "For more information on verification procedure, use -verify" +
                        "Usage:\n" +
                        "`-token {TOKEN}` - Gives players HiveMC Rank to their Discord account\n", "white")
                    });
                break;
            case "verify":
                message.reply("",
                    {
                        embed: embed("-verify command help",
                        "Provides information on how to verify their HiveMC account\n" +
                        "Usage:\n" +
                        "`-verify` - Provides steps to verify players Minecraft Account", "white")
                    });
                break;
            default:
                message.reply("",
                    {
                        embed: embed("Command list",
                        "Available commands:\n" +
                        "`-guess` - Used to guess the current Riddle\n" +
                        "`-help` - Shows available commands\n" +
                        "`-hint` - Provides the hint for the current Riddle\n" +
                        "`-stats` - Views Players statistics from The Hive\n" +
                        "`-token` - Used to verify your minecraft account\n" +
                        "`-verify` - Provides instructions on how to verify your minecraft account\n" +
                        "Use -help {Command} for more information on usage.\n", "blue")
                    });
                break;
            }
        }}else if (message.channel.id == "274488503243636737") {
         if (args[0]==undefined) {
             message.reply("",
                    {
                        embed: embed("Command list",
                        "Available commands:\n" +
                        "-help - Shows available commands\n" +
                        "-say - Forces bot to speak\n" +
                        "-shutdown - Shuts down the bot, restarting it\n" +
                        "-stats - Views Players statistics from The Hive\n" +
                        "-uptime - Provides current session uptime for the bot\n" +
                        "Use -help {Command} for more information on usage.\n" +
                        "Commands Currently under development:\n" +
                        "-voice - Will be used for creation of private voice channels" +
                        "-leaderboards - Will be used for checking leaderboard position of a player", "blue")
                    });
         } else {
            switch (args[0].toLowerCase()) {
            case "help":
                message.reply("",
                    {
                        embed: embed("-help command help",
                        "Provides help for all available commands\n" +
                        "Usage:\n" +
                        "-help - provides a list of all commands\n" +
                        "-help {Command} - Provides help for a specific command", "white")
                    });
                break;
            case "say":
                message.reply("",
                    {
                        embed: embed("-say command help",
                        "Forces bot to say a Message in the provided channel. Available channels:\n" +
                        "#news, #dev, #general, #nsfw, #music and #spam\n" +
                        "Usage:\n" +
                        "-say channelname {Message} - Channelname without #, Message can contain spaces", "white")
                    });
                break;
            case "shutdown":
                message.reply("",
                    {
                        embed: embed("-shutdown command help",
                        "Shuts the bot down, then the bot restarts because it's an immortal pheonix\n" +
                        "Usage:\n" +
                        "-shutdown - Attempts a bot murder", "white")
                    });
                break;
            case "uptime":
                message.reply("",
                    {
                        embed: embed("-uptime command help",
                        "Proides uptime since the last bot restart\n" +
                        "Usage:\n" +
                        "-uptime - provides the uptime", "white")
                    });
                break;
            default:
                message.reply("",
                    {
                        embed: embed("Command list",
                        "Available commands:\n" +
                        "-help - Shows available commands\n" +
                        "-say - Forces bot to speak\n" +
                        "-shutdown - Shuts down the bot, restarting it\n" +
                        "-stats - Views Players statistics from The Hive\n" +
                        "-uptime - Provides current session uptime for the bot\n" +
                        "Use -help {Command} for more information on usage.\n" +
                        "Commands Currently under development:\n" +
                        "-voice - Will be used for creation of private voice channels" +
                        "-leaderboards - Will be used for checking leaderboard position of a player", "blue")
                    });
                break;
            }
        }}
    }
};
