const { Permissions } = require('discord.js');

const create = async (interaction, name) => {
  const guild = interaction.guild;
  const member = interaction.member;

  console.log(`Creating channel with name: "${name}"`);

  try {
    const channel = await guild.channels.create(name, {
      type: 'GUILD_VOICE',
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: ['VIEW_CHANNEL', 'CONNECT']
        },
        {
          id: member.id,
          allow: ['VIEW_CHANNEL', 'CONNECT']
        },
      ],
    });

    console.log('Channel created:', channel);

    await interaction.reply(`Channel "${name}" has been created.`);
    const instructions = `To manage your channel, use the following commands:\n
    - /channel limit {int}: Set the user limit for the channel.\n
    - /channel allow {user}: Allow a user to join the channel.\n
    - /channel kick {user}: Kick a user from the channel.`;

    await member.send(instructions);
  } catch (error) {
    console.error('Error creating channel:', error);
    await interaction.reply('An error occurred while creating the channel.');
  }
};

module.exports = create;
