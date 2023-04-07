async function allow(interaction) {
    const user = interaction.options.getUser('user');
    const channel = interaction.channel;
    await channel.permissionOverwrites.create(user, {
        VIEW_CHANNEL: true,
        CONNECT: true,
    });
    await interaction.reply(`User ${user} can now join ${channel}`);
}

module.exports = allow;