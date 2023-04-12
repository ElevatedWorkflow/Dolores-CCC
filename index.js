const conversationCache = new Map();

require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const fs = require('fs');
const openai = require('openai');
const create = require('./commands/create');
const limit = require('./commands/limit');
const allow = require('./commands/allow');
const kick = require('./commands/kick');
const verify = require('./commands/verify');
const { type } = require('os');
const { getChatGPTResponse } = require('./chatgpt');
openai.apiKey = process.env.OPENAI_API_KEY;

const botToken = process.env.BOT_TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.Guilds,
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
        if (options.data[0]?.options) {
          const nameOption = options.data[0].options[0];
          const name = nameOption.value;
          console.log(`Channel name: ${name}`);
          await create(interaction, name, process.env.BOT_TOKEN); // Pass the botToken directly
        } else {
          await interaction.reply('Channel name is required.');
        }
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
  } else if (commandName === 'verify') {
    await verify(interaction, {
      unverifiedRoleID: process.env.UNVERIFIED_ROLE_ID,
      verifiedRoleID: process.env.VERIFIED_ROLE_ID
    });
    return;
  }
});

client.on('messageCreate', async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Check if the bot is mentioned
  if (message.mentions.has(client.user)) {
    // Update conversation cache
    const userId = message.author.id;
    let conversation = conversationCache.get(userId) || [];

    conversation.push({ role: 'user', content: message.content });
    if (conversation.length > 9) {
      conversation.shift();
    }
    conversationCache.set(userId, conversation);

    const response = await getChatGPTResponse(conversation);

    // Update conversation cache with the bot's response
    conversation.push({ role: 'assistant', content: response });
    conversationCache.set(userId, conversation);

    // Reply with the ChatGPT response if it's not empty
    if (response.trim() !== "") {
      message.reply(response);
    }
  }
});

client.login(botToken);
module.exports = { botToken };
module.exports = { openai };