async function create(interaction) {
  const channelName = interaction.options.getString('name');
  const channelType = interaction.options.getString('type');

  const channel = await interaction.guild.channels.create(channelName, {
    type: channelType, // 'text' or 'voice'
    permissionOverwrites: [    // Permissions for the channel
        {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL', 'CONNECT'],
        },
        {
            id: interaction.user.id,
            allow: ['VIEW_CHANNEL', 'CONNECT'],
        },
    ],
  });

  await instructions();

    async function instructions() {
        await interaction.reply(`Created ${channel}`);
        const instructions = `To manage this channel use the following commands:\n
            - /channel limit {int}: to set the maximum number of users in the channel\n
            - /channel allow {user}: to allow a user to join the channel\n
            - /channel kick {user}: to kick a user from the channel`;

        await interaction.user.send(instructions);
    }
}

module.exports = create;