const { Client, GatewayIntentBits } = require('discord.js');
const BaseService = require('../../base/service.base');

class ClientService extends BaseService {
  constructor(botToken, openai, messageHandler, guildService) {
    super();
    this.botToken = botToken;
    this.openai = openai;
    this.guildService = guildService;
    this.messageHandler = messageHandler;
  }

  async init() {
    this.client = this.createClient();

    this.client.on('ready', async () => {
      console.log(`Logged in as ${this.client.user.tag}!`);

      await this.guildService.registerCommands();

      this.guildService.registerListeners();
    });

    this.client.on('messageCreate', async (message) => {
      if (message.author.bot) return;

      if (message.mentions.has(this.client.user)) {
        await this.messageHandler.handleMentionedMessage(message);
      }
    });

    await this.login();
  }

  createClient() {
    return new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildPresences,
      ],
    });
  }

  async login() {
    await this.client.login(this.botToken);
  }
}

module.exports = ClientService;