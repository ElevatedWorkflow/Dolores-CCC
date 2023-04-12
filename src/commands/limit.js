async function limit(interaction) {
    const channel = interaction.channel;
    const limit = interaction.options.getInteger('number');
    if (limit < 0) {
        await interaction.reply('The limit must be a positive number');
        return;
    }
    await channel.edit({ userLimit: limit });
    await interaction.reply(`The limit for ${channel} is now ${limit}`);
}

module.exports = limit;