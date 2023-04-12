const { Client, GatewayIntentBits } = require('discord.js');
const MessageHandler = require('./MessageHandler');
const BaseService = require('../../base/service.base');
const GuildService = require('./guild.service');
const messageHandler = new MessageHandler();

class ClientService extends BaseService {
  constructor(botToken, openai) {
    super();
    this.botToken = botToken;
    this.openai = openai;
    this.guildService = new GuildService(this.client);
  }

  async init() {
    this.client = new Client({
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

    this.client.on('ready', async () => {
      console.log(`Logged in as ${this.client.user.tag}!`);

      await this.guildService.registerCommands();

      this.guildService.registerListeners();

    });

    this.client.on('messageCreate', async (message) => {
      if (message.author.bot) return;

      if (message.mentions.has(this.client.user)) {
        await messageHandler.handleMentionedMessage(message);
      }
    });

    await this.login();
  }

  async login() {
    await this.client.login(this.botToken);
  }
}

module.exports = ClientService;