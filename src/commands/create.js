const { MessageEmbed } = require('discord.js');

async function create(interaction, name, botToken) {
  try {
    console.log(`Creating channel with name: ${name}`);

    const fetch = (await import('node-fetch')).default;

    const response = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild.id}/channels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bot ${botToken}`,
      },
      body: JSON.stringify({
        name: name,
        type: 2, // Change this line to create a voice channel instead of a text channel
      }),
    });

    if (!response.ok) {
      throw new Error(`Error creating channel: ${response.statusText}`);
    }

    const channel = await response.json();
    console.log(`Channel created: ${channel.name}`);

    const embed = new MessageEmbed()
      .setTitle('Channel Created')
      .setDescription(`Created voice channel: ${channel.name}`)
      .setColor('#00FF00');
    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error(`Error creating channel: ${error}`);
    await interaction.reply('Error creating channel.');
  }
}

module.exports = create;
