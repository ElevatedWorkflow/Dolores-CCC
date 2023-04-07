async function kick(interaction) {
    const user = interaction.options.getUser('user');
    const channel = interaction.channel;
    await channel.permissionOverwrites.delete(user);
    await interaction.reply(`User ${user} was kicked from ${channel}`);
}

module.exports = kick;