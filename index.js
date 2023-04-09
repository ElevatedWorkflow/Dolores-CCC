const channelCache = new Map();

require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const fs = require('fs'); // Add this line to import the fs module
const create = require('./commands/create');
const limit = require('./commands/limit');
const allow = require('./commands/allow');
const kick = require('./commands/kick');
const { type } = require('os');

const botToken = process.env.BOT_TOKEN;
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

  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) return console.error('Guild not found');

  // Read and parse the commands.json file
  const commandData = JSON.parse(fs.readFileSync('./commands.json', 'utf-8'));

  // Iterate through the commands and create each one
  for (const command of commandData) {
    await guild.commands.create(command);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'channel') {
    const subcommand = options.getSubcommand();

    switch (subcommand) {
      case 'create':
        const name = options.getString('name');
        await create(interaction, name, ChannelType);
        break;
      case 'limit':
        await limit(interaction);
        break;
      case 'allow':
        await allow(interaction);
        break;
      case 'kick':
        await kick(interaction);
        break;
      default:
        await interaction.reply('Unknown subcommand.');
    }
  }
});

client.login(botToken);