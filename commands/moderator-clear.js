const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Belirtilen sayıda mesajı sil')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Silinecek mesaj sayısı (1-100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    try {
      await interaction.channel.bulkDelete(amount, true);
      return interaction.reply({
        content: `🗑️ ${amount} mesaj silindi!`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: '❌ Mesaj silme işlemi başarısız!', ephemeral: true });
    }
  },
};
