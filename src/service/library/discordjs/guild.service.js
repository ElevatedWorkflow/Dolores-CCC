const BaseService = require('../../base/service.base');

class GuildService extends BaseService {
  constructor() {
    super();
  }

  getGuild() {
    return this.Client.client.guilds.cache.get(process.env.GUILD_ID);
  }
}

module.exports = GuildService;