const {
    ChannelJSON,
    ClientJSON,
    CommandJSON,
    ReactionRoleJSON,
    RoleJSON,
    SystemJSON,
  } = require('../../repository/config.repository');

  
  class ConfigService {
    Channel = ChannelJSON;
    Client = ClientJSON;
    Command = CommandJSON;
    ReactionRole = ReactionRoleJSON;
    Role = RoleJSON;
    System = SystemJSON;
  
    constructor() {}
  
    Validate = () => {
      this.Logger.Log.System(this.Message.Messages.system.startup.config.start);
      GetAllConfigs().forEach(async (config) => {
        try {
          this.ValidateConfig(config);
          this.Logger.Log.Success(
            `${this.Message.Messages.system.startup.config.success}${config.Name}`
          );
        } catch (e) {
          if (e instanceof Error) {
            throw e;
          }
        }
      });
      this.Logger.Log.System(this.Message.Messages.system.startup.config.done);
    };
  
    ValidateConfig = (config) => {
      try {
        let configJSON = JSON.parse(JSON.stringify(config));
        if (configJSON == null) {
          return false;
        }
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(
            `${this.Message.Messages.error.startup.config}${config.Name}:\n${e.message}`
          );
        }
      }
      return true;
    };
  }
  
  const GetAllConfigs = () => {
    return [
      ChannelJSON,
      ClientJSON,
      CommandJSON,
      ReactionRoleJSON,
      RoleJSON,
      SystemJSON,
    ];
  };
  
  module.exports = ConfigService;