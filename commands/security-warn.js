const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Bir kullanıcıyı uyar')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Uyarılacak kullanıcı')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Uyarı nedeni')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    const embed = new EmbedBuilder()
      .setColor('Red')
      .setTitle('⚠️ Uyarı Verildi')
      .setDescription(`${user.tag} kullanıcısına uyarı verildi.`)
      .addFields(
        { name: 'Kullanıcı', value: `<@${user.id}>`, inline: true },
        { name: 'Uyarı Veren', value: `<@${interaction.user.id}>`, inline: true },
        { name: 'Neden', value: reason }
      )
      .setTimestamp();

    try {
      await user.send({ embeds: [embed] }).catch(() => {});
      return interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: '❌ Uyarı gönderilemedi!', ephemeral: true });
    }
  },
};
