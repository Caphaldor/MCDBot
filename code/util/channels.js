module.exports = {
    hasChannel: function(userID) {
      for(var channelsVariable in config.customChannels) {
        if(channelsVariable.created[0] == userID) {
          return true;
        }
      }
      return false;
    },
    isCustomChannel: function(channelID) {
      for(var channelsVariable in config.customChannels) {
        if(channelsVariable.channelID == channelID) {
          return true;
        }
      }
      return false;
    },
    createChannel: function(userID, userName, channelID, channelName) {
      config.customChannels[channelID] = {};
      config.customChannels[channelID].channelID = channelID;
      config.customChannels[channelID].name = channelName;
      config.customChannels[channelID].created = [userID, userName];
      config.customChannels[channelID].createdTimestamp = ((new Date).getTime() * 1000);
      config.customChannels[channelID].private = false;
    },
    createPrivateChannel: function(userID, userName, channelID, channelName, allowedUsers) {
      config.customChannels[channelID] = {};
      config.customChannels[channelID].channelID = channelID;
      config.customChannels[channelID].name = channelName;
      config.customChannels[channelID].created = [userID, userName];
      config.customChannels[channelID].createdTimestamp = ((new Date).getTime() * 1000);
      config.customChannels[channelID].private = true;
      config.customChannels[channelID].allowedUsers = allowedUsers;
    },
    removeChannel: function(channelID) {
      delete config.customChannels[channelID];
    }
};
