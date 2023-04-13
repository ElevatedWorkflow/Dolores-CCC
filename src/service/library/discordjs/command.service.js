class CommandService {
  constructor(clientService, guildService, messageService, loggerService) {
    this.clientService = clientService;
    this.guildService = guildService;
    this.messageService = messageService;
    this.loggerService = loggerService;
  }

  async registerCommands() {
    try {
      const guild = await this.guildService.getGuild();

      this.loggerService.logSystem(
        `${this.messageService.Messages.command.register.prefix} ${this.messageService.Messages.command.register.start}`
      );

      const commands = this.configService.Command.commands;
      for (const [commandName, commandData] of Object.entries(commands)) {
        await guild.commands.create(commandData);
        this.loggerService.logSuccess(`Registered command: ${commandName}`);
      }

      this.loggerService.logSuccess(
        `${this.messageService.Messages.command.register.prefix} ${this.messageService.Messages.command.register.success}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  setupListeners() {
    this.clientService.Client.on('interactionCreate', async (interaction) => {
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