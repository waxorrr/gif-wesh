const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Bir kullanıcıyı sessiz yap')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Sessize alınacak kullanıcı')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('time')
        .setDescription('Sessiz kalma süresi (dakika)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Sessiz alma nedeni')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const time = interaction.options.getInteger('time');
    const reason = interaction.options.getString('reason') || 'Neden belirtilmedi';
    const member = await interaction.guild.members.fetch(user.id);

    try {
      await member.timeout(time * 60 * 1000, reason);
      return interaction.reply({
        content: `🔇 ${user.tag} ${time} dakika boyunca sessiz alındı!\n**Neden:** ${reason}`,
        ephemeral: false,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: '❌ Sessiz alma işlemi başarısız!', ephemeral: true });
    }
  },
};
