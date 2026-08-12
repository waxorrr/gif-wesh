const { Collection } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`Komut bulunamadı: ${interaction.commandName}`);
      return;
    }

    const { cooldowns } = interaction.client;

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownSeconds = 3;
    const cooldownAmount = (command.cooldown || defaultCooldownSeconds) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        return interaction.reply({
          content: `⏳ Bu komutu tekrar kullanabilmek için <t:${expiredTimestamp}:R> bekleyin.`,
          ephemeral: true,
        });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: '❌ Komutu yürütürken bir hata oluştu!',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: '❌ Komutu yürütürken bir hata oluştu!',
          ephemeral: true,
        });
      }
    }
  },
};
