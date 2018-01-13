module.exports = {
    hint: require("./challengeHintCommand.js"),
    //guess: require("./challengeGuessCommand.js"),
	levels: require("./levelsCommand"),
    math: require("./math.js"),
    times: require("./timesCommand.js"),
    guess: require("./easterChallenge.js"),
    uptime: require("./uptimeCommand.js"),
    shutdown: require("./shutdownCommand.js"),
    verify: require("./verifyCommand.js"),
    token: require("./tokenCommand.js"),
    stats: require("./statsCommand.js"),
    say: require("./sayCommand.js"),
    voice: require("./voiceCommand.js"),
    ldb: require("./leaderboardsCommand.js"),
    leaderboards: require("./leaderboardsCommand.js"),
    leaderboard: require("./leaderboardsCommand.js"),
    help: require("./helpCommand.js"),
    toggle: require("./toggleCommand.js"),
    compare: require("./compareCommand.js"),
    config: require("./configEditCommand.js"),
    player: require("./playerCommand.js")
};
