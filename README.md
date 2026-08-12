# 🎬 Gif Wesh - Discord Bot

Tüm özellikleriyle güvenlik, moderasyon ve gif botu!

## 📋 Özellikler

### 🛡️ Güvenlik Komutları
- `/ban` - Kullanıcıyı banla
- `/kick` - Kullanıcıyı at
- `/warn` - Kullanıcıyı uyar

### 🛠️ Moderator Komutları
- `/mute` - Kullanıcıyı sessiz yap
- `/clear` - Mesajları sil

### 🎥 Gif Komutları
- `/gif` - Konu ara ve gif göster
- `/randomgif` - Random gif göster

## 🚀 Kurulum

### Gereksinimler
- Node.js 16+
- npm veya yarn
- Discord Bot Token
- Giphy API Key (gif komutları için)

### Adımlar

1. **Repository'i klonla**
```bash
git clone https://github.com/waxorrr/Gif-Wesh.git
cd Gif-Wesh
```

2. **Bağımlılıkları yükle**
```bash
npm install
```

3. **.env dosyasını oluştur**
```bash
cp .env.example .env
```

4. **.env dosyasını düzenle**
```
DISCORD_TOKEN=your_bot_token_here
PREFIX=!
GIPHY_API_KEY=your_giphy_api_key_here
```

### Bot Token Nasıl Alınır?
1. [Discord Developer Portal](https://discord.com/developers/applications) ziyaret et
2. "New Application" oluştur
3. "Bot" sekmesine git
4. "Add Bot" butonuna tıkla
5. Token'ı kopyala ve .env dosyasına yapıştır

### Giphy API Key Nasıl Alınır?
1. [Giphy Developers](https://developers.giphy.com/) ziyaret et
2. Kayıt ol / Giriş yap
3. Yeni API key oluştur
4. Key'i .env dosyasına yapıştır

## 🎮 Çalıştırma

### Geliştirme Modu (auto-restart ile)
```bash
npm run dev
```

### Production Modu
```bash
npm start
```

## 📝 Komut Örnekleri

### Ban Komutunu Kullan
```
/ban user: @kullanıcı reason: spam yapıyor
```

### Gif Ara
```
/gif query: cat
```

### Random Gif Göster
```
/randomgif tag: funny
```

## 🤝 Yardım

Probleminiz varsa:
1. GitHub Issues açın
2. Problemi detaylı açıklayın
3. Hata mesajını paylaşın

## 📄 Lisans

MIT License - Detaylar için LICENSE dosyasına bakın

## 👨‍💻 Geliştirici

**Gif Wesh** - [waxorrr](https://github.com/waxorrr)

---

⭐ Projeyi beğendiysen yıldız ver!
