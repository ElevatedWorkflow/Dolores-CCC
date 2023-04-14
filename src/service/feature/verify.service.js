class VerifyService {
  constructor() {
    // Constructor logic here (if needed)
  }

  async verify(interaction, config) {
    // Check if the sender has the required roles
    const hasVerifyRole = interaction.member.roles.cache.has(process.env.VERIFY_ROLE_ID);
    //const hasAdministratorRole = interaction.member.roles.cache.has(process.env.ADMINISTRATOR_ROLE_ID);

    if (!hasVerifyRole) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    // Extract the user mentioned in the command
    const userToVerify = interaction.options.getUser('user');

    if (!userToVerify) {
      return interaction.reply({ content: 'Please mention a user to verify.', ephemeral: true });
    }

    const memberToVerify = await interaction.guild.members.fetch(userToVerify);

    // Remove the "Unverified" role and add the "Verified" role
    await memberToVerify.roles.remove(config.unverifiedRoleID);
    await memberToVerify.roles.add(config.verifiedRoleID);

    interaction.reply({ content: `${memberToVerify.user.username} has been verified!`, ephemeral: true });
  }
}

module.exports = VerifyService;