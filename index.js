require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const create = require('./commands/create');
const limit = require('./commands/limit');
const allow = require('./commands/allow');
const kick = require('./commands/kick');

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


  // Register the slash command for managing channels
  await guild.commands.create({
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'channel') {
    const subcommand = options.getSubcommand();

    switch (subcommand) {
      case 'create':
        await create(interaction);
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
