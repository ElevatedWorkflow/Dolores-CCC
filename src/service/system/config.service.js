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

  GetAllConfigs = () => {
    return [
      ChannelJSON,
      ClientJSON,
      CommandJSON,
      ReactionRoleJSON,
      RoleJSON,
      SystemJSON,
    ];
  };
}

  module.exports = ConfigService;