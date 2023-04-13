const BaseService = require('../base/service.base');

function VCManagerService() {
  BaseService.call(this);
}

VCManagerService.prototype = Object.create(BaseService.prototype);
VCManagerService.prototype.constructor = VCManagerService;

VCManagerService.prototype.createPermissionOverwrites = function (guild, user) {
  const everyoneRole = guild.roles.everyone;

  return [
    {
      id: everyoneRole.id,
      deny: ['VIEW_CHANNEL'],
    },
    {
      id: user.id,
      allow: ['VIEW_CHANNEL', 'CONNECT'],
    },
  ];
};

VCManagerService.prototype.create = async function (interaction, channelName, parentChannelId, userLimit, user) {
  const guild = interaction.guild;
  const permissionOverwrites = this.createPermissionOverwrites(guild, user);

  try {
    const channel = await guild.channels.create(channelName, {
      type: 'GUILD_VOICE',
      parent: parentChannelId,
      userLimit: userLimit,
      permissionOverwrites: permissionOverwrites,
    });

    const embed = EmbedService.createBasicEmbedFromData('Channel Created', `Created voice channel: ${channel.name}`, [], false);
    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error(`Error creating channel: ${error}`);
    await interaction.reply('Error creating channel.');
  }
};

VCManagerService.prototype.limit = async function (interaction) {
  const channel = interaction.channel;
  const limit = interaction.options.getInteger('number');
  if (limit < 0) {
    await interaction.reply('The limit must be a positive number');
    return;
  }
  await channel.edit({ userLimit: limit });
  await interaction.reply(`The limit for ${channel} is now ${limit}`);
};

VCManagerService.prototype.allow = async function (interaction) {
  const user = interaction.options.getUser('user');
  const channel = interaction.channel;
  await channel.permissionOverwrites.create(user, {
    VIEW_CHANNEL: true,
    CONNECT: true,
  });
  await interaction.reply(`User ${user} can now join ${channel}`);
};

VCManagerService.prototype.kick = async function (interaction) {
  const user = interaction.options.getUser('user');
  const channel = interaction.channel;
  await channel.permissionOverwrites.delete(user);
  await interaction.reply(`User ${user} was kicked from ${channel}`);
};

module.exports = VCManagerService;