const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const SlashCommandsClient = require("discord-slash-commands-client");

// Replace 'your-bot-token' with your bot's token
const botToken = "your-bot-token";
const client = new Client({ intents: [Intents.FLAGS.Guilds, Intents.FLAGS.GuildMessages] });

// Create a new SlashCommandsClient instance
const slashCommands = new SlashCommandsClient(botToken);

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Register the slash command for creating channels
  await slashCommands.createCommand(
    {
      name: "channel",
      description: "Create a new channel",
      options: [
        {
          name: "create",
          description: "Create a new channel",
          type: 1,
          options: [],
        },
      ],
    },
    "your-guild-id" // Replace with your server's Guild ID
  );
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "channel" && options.getSubcommand() === "create") {
    const channel = await interaction.guild.channels.create("channelname", {
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"],
        },
        {
          id: interaction.member,
          allow: [
            "VIEW_CHANNEL",
            "SEND_MESSAGES",
            "EMBED_LINKS",
            "ATTACH_FILES",
            "READ_MESSAGE_HISTORY",
          ],
        },
        {
          id: interaction.guild.me,
          allow: [
            "VIEW_CHANNEL",
            "SEND_MESSAGES",
            "EMBED_LINKS",
            "ATTACH_FILES",
            "READ_MESSAGE_HISTORY",
          ],
        },
      ],
    });

    channel.edit({ name: `${channel.id}-store` });

    // Send a direct message to the member
    const user = interaction.user;
    await user.send(`Your channel has been created: ${channel}`);

    // Reply to the slash command
    await interaction.reply("Channel created successfully.");
  }
});

client.login(botToken);