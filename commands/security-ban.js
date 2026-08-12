const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bir kullanıcıyı sunucudan banla')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Banlanacak kullanıcı')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Ban nedeni')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Neden belirtilmedi';
    const member = await interaction.guild.members.fetch(user.id);

    if (!member.bannable) {
      return interaction.reply({ content: '❌ Bu kullanıcıyı banlamam!', ephemeral: true });
    }

    try {
      await member.ban({ reason });
      return interaction.reply({
        content: `✅ ${user.tag} banlandı!\n**Neden:** ${reason}`,
        ephemeral: false,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: '❌ Ban işlemi başarısız!', ephemeral: true });
    }
  },
};
