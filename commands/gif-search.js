const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Belirtilen konu için gif ara')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Aranacak konu')
        .setRequired(true)
    ),

  async execute(interaction) {
    const query = interaction.options.getString('query');
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
        `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(query)}&api_key=${apiKey}&limit=1`
      );

      if (!response.data.data || response.data.data.length === 0) {
        return interaction.editReply('❌ Gif bulunamadı!');
      }

      const gif = response.data.data[0];
      const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle(`🎬 ${query} Gif`)
        .setImage(gif.images.original.url)
        .setFooter({ text: `Powered by Giphy` })
        .setTimestamp();

      return interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return interaction.editReply('❌ Gif arama başarısız oldu!');
    }
  },
};
