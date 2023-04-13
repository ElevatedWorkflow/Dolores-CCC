const { MessageEmbed } = require('discord.js');
const BaseService = require('../../base/service.base');
const EmbedParam = require('../../../model/embedparam.model');

class EmbedService extends BaseService {
  static createReactionRoleEmbed(reactionRoleGroup) {
    const embedFields = reactionRoleGroup.members.map((member) => new EmbedParam(member.roleName, member.emoji));
    return createBasicEmbedFromData(reactionRoleGroup.name, reactionRoleGroup.message, embedFields, reactionRoleGroup.inline);
  }
}

const createBasicEmbed = (title, description) => {
  return new MessageEmbed().setTitle(title).setDescription(description).setColor('#ff0000');
};

const createBasicEmbedFromData = (title, description, embedParams, inline) => {
  const embed = createBasicEmbed(title, description);
  embedParams.forEach((data) => {
    if (inline) {
      embed.addFields({ name: data.name, value: data.value, inline: true });
    } else {
      embed.addFields({ name: `${data.name} // ${data.value}`, value: '--------------------', inline: false });
    }
  });
  return embed;
};

module.exports = EmbedService;