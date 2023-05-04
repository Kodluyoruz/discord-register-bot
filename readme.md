# Discord Kayıt Botu

![banner](https://user-images.githubusercontent.com/39780/236168231-516d688e-8f15-45d5-a80f-889e0b7f0b00.png)

![coming soon](https://img.shields.io/badge/Status-Coming%20Soon-blue)

[Please click here for English version 🇺🇸](readme.en.md)

## Proje Hakkında

Discord Kayıt Botu, kullanıcılara kayıt kodu kullanarak bir sunucuya kayıt olma ve kendilerine rol atama imkanı sunan bir Discord botudur. Yeni kayıt kodları oluşturulabilir, log, moderasyon ve kayıt kanalları belirlenebilir.

Proje Discord.js, dotenv, i18next, mongoose, winston kütüphanelerini kullanmaktadır. [Node.js](https://nodejs.org/en/download)'in en son sürümüne, [MongoDB](https://www.mongodb.com/) veritabanına, [Discord Bot Kaydına](docs/BotKaydi.md) ihtiyaç duyar.

## Başlarken

### Proje Nasıl Kurulur ve Çalıştırılır

1. **Node.js**'in LTS sürümü veya daha yüksek bir sürümünün yüklü olduğundan emin olun. Node.js yüklü değilse, aşağıdaki web sitesini ziyaret ederek indirin ve kurun: [https://nodejs.org/en/](https://nodejs.org/en/)
2. Bu projeyi klonlayın veya proje sayfasından "Code" butonu altındaki "Download ZIP" butonuna tıklayarak projeyi cihazınıza indirin ve zip dosyasının içeriğini çalışma dizininize aktarın. Klonlamak için aşağıdaki komutu kullanın:

   ```bash
   git clone https://github.com/Kodluyoruz/discord-register-bot
   ```

3. Konsola `npm install` yazarak gerekli bağımlılıkları yükleyin.
4. Konsolu açın ve projenin bulunduğu dizine gidin.
5. `.env` dosyası oluşturun ve `TOKEN` adında bir değişken oluşturarak botunuzun token'ını atayın. Token'ınızı Discord Developer Portal'dan alabilirsiniz.
6. MongoDB veritabanı kullanacaksanız, `MONGO_URI` adında bir değişken oluşturarak MongoDB bağlantı cümlesini atayın.
7. Botunuzu çalıştırmak için konsolda `node .` komutunu yazın.

### Ayarlar

Projenin çalışması için gerekli ayarlar için aşağıdaki linkten "[ProjeninCalistirilmasi.md](docs/projenincalistirilmasi.md/)" dosyasına göz atabilirsiniz.

```bash
DISCORD_BOT_TOKEN=<Discord Uygulama Bot Token>
MONGO_URI=mongodb+srv://kullanıcı:şifre@sunucu/tablo
```

### Gereksinimler

- Discord.js v14 için Node.js 16.9.0 veya daha yeni bir sürümü gereklidir.

## Özellikler

- Sunucuya katılan kullanıcılara kayıt kanalında kaydolma seçeneği sunar.
- Kullanıcılar kayıt kanalında kaydol seçeneğini seçerek kendilerine verilen kayıt kodunu girerler.
- Kayıt kodu sistemde mevcut ise, kullanıcıya ilgili rol atanır ve sunucunun diğer bölümlerine erişim izni verilir.
- Kayıt kodu sistemde mevcut değilse, kullanıcıya hata mesajı gösterilir ve tekrar deneme talep edilir.
- Moderatörler moderasyon kanalında ayarla seçeneğini seçerek rollere yeni kayıt kodları ekleyebilir veya silebilirler. Açılan menüden rol listesini seçerek kayıt kodunu girerler.
- Yönetici botu ilk kurduğunda /ayarlar komutunu kullanarak log, moderasyon ve kayıt kanallarını belirler.

## Katkı Sağlayanlar

[Azat ESER](https://github.com/azateser)

[Bilgehan Zeki Özaytaç](https://github.com/WildGenie)

[Deniz Kaparlar](https://github.com/denizk1)

[Hasan Aydoğdu](https://github.com/haydogdu1990)

[Muhammed Mustafa Savar](https://github.com/muffafa)

[Uveys Gurbuz](https://github.com/uveysg)

## Dökümanlar

## Lisans

Bu proje [MIT lisansı](https://choosealicense.com/licenses/mit/) altında lisanslanmıştır. Bu lisansın detayları için [LICENSE](LICENSE) dosyasına bakabilirsiniz.
