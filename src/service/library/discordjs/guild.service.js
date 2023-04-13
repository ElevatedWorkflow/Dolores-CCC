class GuildService {
  constructor() {
    
  }

  getGuild() {
    return this.Client.client.guilds.cache.get(process.env.GUILD_ID);
  }
}

module.exports = GuildService;