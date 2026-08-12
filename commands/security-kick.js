const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Bir kullanıcıyı sunucudan at')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Atılacak kullanıcı')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('At nedeni')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Neden belirtilmedi';
    const member = await interaction.guild.members.fetch(user.id);

    if (!member.kickable) {
      return interaction.reply({ content: '❌ Bu kullanıcıyı atamanam!', ephemeral: true });
    }

    try {
      await member.kick(reason);
      return interaction.reply({
        content: `✅ ${user.tag} sunucudan atıldı!\n**Neden:** ${reason}`,
        ephemeral: false,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: '❌ At işlemi başarısız!', ephemeral: true });
    }
  },
};
