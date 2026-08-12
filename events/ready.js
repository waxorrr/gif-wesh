module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`\n✅ Bot başarıyla giriş yaptı: ${client.user.tag}`);
    console.log(`🎮 ${client.guilds.cache.size} sunucuda hizmet veriliyor\n`);
    
    client.user.setActivity('Gif Wesh 🎬', { type: 'PLAYING' });
  },
};
