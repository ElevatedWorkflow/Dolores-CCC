const BaseService = require('../../base/service.base');
const GuildService = require('../discordjs/guild.service');
const VerifyService = require('./verify.service');
const VCManagerService = require('./vcmanager.service');
const EmbedService = require('../discordjs/embed.service');

class CommandService extends BaseService {
  constructor() {
    super();
    this.guildService = new GuildService(this.Client);
  }

  async register() {
    try {
      const guild = await this.guildService.getGuild();

      this.Logger.Log.System(
        `${this.Message.Messages.command.register.prefix} ${this.Message.Messages.command.register.start}`
      );

      const commands = this.Config.Command.commands;
      for (const [commandName, commandData] of Object.entries(commands)) {
        await guild.commands.create(commandData);
        this.Logger.Log.Success(`Registered command: ${commandName}`);
      }

      this.Logger.Log.Success(
        `${this.Message.Messages.command.register.prefix} ${this.Message.Messages.command.register.success}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  setupListeners() {
    this.Client.on('interactionCreate', async (interaction) => {
      if (interaction.isCommand()) {
        this.bind(interaction);
      }
    });
  }

  async bind(interaction) {
    const { commandName, options } = interaction;

    if (commandName === 'channel') {
      const subcommand = options.getSubcommand();
      const subcommands = {
        create: VCManagerService.prototype.create,
        limit: VCManagerService.prototype.limit,
        allow: VCManagerService.prototype.allow,
        kick: VCManagerService.prototype.kick,
      };

      if (subcommands[subcommand]) {
        await subcommands[subcommand](interaction);
      } else {
        await interaction.reply('Unknown subcommand.');
      }
    } else if (commandName === 'verify') {
      await VerifyService.prototype.verify(interaction, {
        unverifiedRoleID: process.env.UNVERIFIED_ROLE_ID,
        verifiedRoleID: process.env.VERIFIED_ROLE_ID,
      });
    }
  }
}

module.exports = CommandService;