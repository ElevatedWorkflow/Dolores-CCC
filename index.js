const { Client, GatewayIntentBits } = require('discord.js');

const botToken = 'BOT_TOKEN_HERE';
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const guild = client.guilds.cache.get('GUILD_ID_HERE');
  if (!guild) return console.error('Guild not found');

  // Register the slash command for managing channels
  await guild.commands.create({
    name: 'channel',
    description: 'Manage custom channels',
    options: [
      {
        name: 'create',
        description: 'Create a new channel',
        type: 1,
        options: [
          {
            name: 'name',
            description: 'Name of the new channel',
            type: 3,
            required: true,
          },
        ],
      },
      {
        name: 'limit',
        description: 'Set the user limit for a channel',
        type: 1,
        options: [
          {
            name: 'int',
            description: 'User limit',
            type: 4,
            required: true,
          },
        ],
      },
      {
        name: 'allow',
        description: 'Allow a user to access the channel',
        type: 1,
        options: [
          {
            name: 'user',
            description: 'User to allow',
            type: 9,
            required: true,
          },
        ],
      },
      {
        name: 'kick',
        description: 'Kick a user from the channel',
        type: 1,
        options: [
          {
            name: 'user',
            description: 'User to kick',
            type: 9,
            required: true,
          },
        ],
      },
    ],
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'channel') {
    const subcommand = options.getSubcommand();

    switch (subcommand) {
      case 'create':
        // Handle channel creation
        const channelName = options.getString('name');
        const everyoneRole = interaction.guild.roles.everyone;

        const channel = await interaction.guild.channels.create(channelName, {
          type: 'GUILD_TEXT',
          permissionOverwrites: [
          {
            id: everyoneRole.id,
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
          },
          {
            id: interaction.user.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
          },
        ],
      });

        await interaction.reply(`Channel "${channelName}" created!`);
        const instructions = `To manage your channel, use the following commands:\n
        - /channel limit {int}: Set the user limit for the channel\n
        - /channel allow {user}: Allow a user to access the channel\n
        - /channel kick {user}: Kick a user from the channel`;

        await interaction.user.send(instructions);
        break;
      case 'limit':
        // Handle setting channel user limit
        break;
      case 'allow':
        // Handle allowing user access to the channel
        break;
      case 'kick':
        // Handle kicking user from the channel
        break;
      default:
        await interaction.reply('Unknown subcommand.');
    }
  }
});

client.login(botToken);
