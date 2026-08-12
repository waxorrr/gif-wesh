const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('randomgif')
    .setDescription('Random bir gif göster')
    .addStringOption(option =>
      option.setName('tag')
        .setDescription('Gif kategorisi (opsiyonel)')
        .setRequired(false)
    ),

  async execute(interaction) {
    const tag = interaction.options.getString('tag') || 'random';
    const apiKey = process.env.GIPHY_API_KEY;

    if (!apiKey) {
      return interaction.reply({
        content: '❌ Gif API anahtarı ayarlanmamış!',
        ephemeral: true,
      });
    }

    try {
      await interaction.deferReply();

      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/random?tag=${encodeURIComponent(tag)}&api_key=${apiKey}`
      );

      const gif = response.data.data;
      const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('🎲 Random Gif')
        .setImage(gif.images.original.url)
        .setFooter({ text: `Powered by Giphy` })
        .setTimestamp();

      return interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return interaction.editReply('❌ Random gif yükleme başarısız!');
    }
  },
};
