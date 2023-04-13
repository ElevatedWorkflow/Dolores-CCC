class ChannelService  {
  Validate = () => {
    this.Logger.Log.System(this.Message.Messages.system.startup.channel.start);
    this.GetSystemChannels().forEach((option) => {
      let channel = this.GetChannel(option[1]);
      if (channel !== undefined) {
        this.Logger.Log.Success(
          `${this.Message.Messages.system.startup.channel.success}${option[0]} [${channel.name}]`
        );
      } else {
        this.Logger.Log.Error(
          `${this.Message.Messages.error.startup.channel}${option}`
        );
      }
    });
    this.Logger.Log.System(this.Message.Messages.system.startup.channel.done);
  };

  GetChannel = (channelID) => {
    return this.Client.channels.cache.get(channelID);
  };

  GetSystemChannel = (channelIndex) => {
    return this.GetChannel(
      this.GetSystemChannels().find((channel) => {
        return channel[0] == channelIndex;
      })[1]
    );
  };

  GetSystemChannels = () => {
    let channelConfig = Object(this.Config.Channel);
    return Object.keys(channelConfig)
      .filter((option) => {
        return option != 'Name';
      })
      .map((channel) => {
        return [channel, channelConfig[channel]];
      });
  };
}

module.exports = ChannelService;