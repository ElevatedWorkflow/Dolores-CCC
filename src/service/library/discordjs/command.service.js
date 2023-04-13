class CommandService {
  constructor(
    clientService,
    guildService,
    messageService,
    loggerService,
    validationHelperService,
    vcManagerService,
    verifyService
  ) {
    this.clientService = clientService;
    this.guildService = guildService;
    this.messageService = messageService;
    this.loggerService = loggerService;
    this.validationHelperService = validationHelperService;
    this.vcManagerService = vcManagerService;
    this.verifyService = verifyService;
  }

  async registerCommands() {
    try {
      const guild = await this.guildService.getGuild();

      this.loggerService.logSystem(
        `${this.messageService.Messages.command.register.prefix} ${this.messageService.Messages.command.register.start}`
      );

      this.validationHelperService.validateConfig(this.configService.Command.commands);

      for (const [commandName, commandData] of Object.entries(this.configService.Command.commands)) {
        await guild.commands.create(commandData);
        this.loggerService.logSuccess(`Registered command: ${commandName}`);
      }

      this.loggerService.logSuccess(
        `${this.messageService.Messages.command.register.prefix} ${this.messageService.Messages.command.register.success}`
      );
    } catch (error) {
      this.loggerService.logError(error.message, error);
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
        create: this.vcManagerService.create.bind(this.vcManagerService),
        limit: this.vcManagerService.limit.bind(this.vcManagerService),
        allow: this.vcManagerService.allow.bind(this.vcManagerService),
        kick: this.vcManagerService.kick.bind(this.vcManagerService),
      };

      if (subcommands[subcommand]) {
        await subcommands[subcommand](interaction);
      } else {
        await interaction.reply('Unknown subcommand.');
      }
    } else if (commandName === 'verify') {
      await this.verifyService.verify(interaction, {
        unverifiedRoleID: process.env.UNVERIFIED_ROLE_ID,
        verifiedRoleID: process.env.VERIFIED_ROLE_ID,
      });
    }
  }
}

module.exports = CommandService;