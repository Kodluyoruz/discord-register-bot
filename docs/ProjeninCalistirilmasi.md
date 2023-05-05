# Projeyi Çalıştırma

Bu dosyada, Discord Kayıt Botu projesini nasıl kuracağınız, yapılandıracağınız ve başlatacağınız hakkında ayrıntılı talimatlar bulacaksınız.

## Gereksinimler

- [Node.js](https://nodejs.org/) v16.x veya daha yeni bir sürümü
- [MongoDB](https://www.mongodb.com/) hesabı
- [Discord Uygulama Kaydı ve Discord Bot Token'ı](BotKaydi.md)

## Kurulum

1. Bu projeyi klonlayın veya zip dosyası olarak indirin.
2. Projeyi yerel bir dizine açın.
3. Konsolu açın ve projenin bulunduğu dizine gidin.
4. Konsola `npm install` yazarak gerekli paketleri yükleyin.

## Yapılandırma

1. `.env.sample` dosyasının adını `.env` olarak değiştirin.
2. Discord Bot Token'ınızı `DISCORD_BOT_TOKEN` alanına ekleyin.
3. MongoDB bağlantı dizesini `MONGO_URI` alanına ekleyin.

## Başlatma

1. Konsolu açın ve projenin bulunduğu dizine gidin.
2. Konsola `node .` yazarak projeyi başlatın.

## Komutlar

- `/ayarlar`: Uygulama kanala bağlandıktan sonra kanalların ayarlanması için gerekli ayar menüsünü açar.
- `/kurulum`: Ayarlar yapıldıktan sonra rollerin tanımlanması ve kanal ayarlarının değiştirilmesi için menünün açılmasını sağlar.
- `/ayarlar kayıtkanal: #kanal logkanal: #kanal modkanal: #kanal`: ~~Kayıt, log ve moderasyon kanalının ayarlanmasını sağlar.~~

## Menüler

- **Ayar ve Kurulum Menüleri**: Uygulama için gerekli kanal ayarları ve roller için gerekli kod tanımlamalarının yapılmasını sağlar.
- **Kayıt Menüsü**: Kullanıcının rol kaydının yapılması için gerekli kodu girmesini ve kullanıcı takma adının düzenlenmesini sağlar.
- **Kayıt İşlem Menüleri**: ~~Yöneticilerin kaydolan kullanıcıları takip etmesini ve gerekli durumlarda müdahale etmesini sağlar.~~
