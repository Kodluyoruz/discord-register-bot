# Discord Kayıt Botu

![banner](https://user-images.githubusercontent.com/39780/236168231-516d688e-8f15-45d5-a80f-889e0b7f0b00.png)

![coming soon](https://img.shields.io/badge/Status-Coming%20Soon-blue)

[English version 🇺🇸](readme.en.md)

## Proje Hakkında

Discord Kayıt Botu, kullanıcılara kayıt kodu kullanarak bir sunucuya kayıt olma ve kendilerine rol atama imkanı sunan bir Discord botudur. Yeni kayıt kodları oluşturulabilir, log, moderasyon ve kayıt kanalları belirlenebilir.

## Başlarken

### Gereksinimler

[Discord.js](https://github.com/discordjs/discord.js) v14 için [Node.js](https://nodejs.org/en/download) 16.9.0 veya daha yeni bir sürümü gereklidir.

Projenin verilerinin kaydedilmesi için [MongoDB](https://www.mongodb.com/) veritabanını ihtiyaç duyar.
Botun çalışması için [Discord Developer Portal](https://discord.com/developers/applications) üzerinden bir bot oluşturulmalıdır.

### Proje Nasıl Kurulur ve Çalıştırılır

Projenin kullanımı ve çalıştırılması hakkında daha fazla bilgi için [Projenin Kurulumu ve Çalıştırılması](docs/ProjeninCalistirilmasi.md) dokümanına göz atabilirsiniz.

**Node.js**'in LTS sürümü veya daha yüksek bir sürümünün yüklü olduğundan emin olun. Node.js yüklü değilse, aşağıdaki web sitesini ziyaret ederek indirin ve kurun: [https://nodejs.org/en/](https://nodejs.org/en/)

**MongoDB**'nin yüklü olduğundan emin olun. MongoDB yüklü değilse, aşağıdaki web sitesini ziyaret ederek indirin ve kurun: [https://www.mongodb.com/](https://www.mongodb.com/)

Dilerseniz mevcut bir MongoDB veritabanı kullanabilirsiniz. MongoDB veritabanı oluşturmak için [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) kullanabilirsiniz.

Bu projeyi klonlayın veya proje sayfasından "Code" butonu altındaki "Download ZIP" butonuna tıklayarak projeyi cihazınıza indirin ve zip dosyasının içeriğini çalışma dizininize aktarın. Klonlamak için aşağıdaki komutu kullanın:

```bash
git clone https://github.com/Kodluyoruz/discord-register-bot
```

Konsola `npm install` yazarak gerekli bağımlılıkları yükleyin.

`.env` dosyası oluşturun ve `DISCORD_BOT_TOKEN` adında bir değişken oluşturarak botunuzun token'ını atayın. Token'ınızı Discord Developer Portal'dan alabilirsiniz.
MongoDB veritabanı için, `MONGO_URI` adında bir değişken oluşturarak MongoDB bağlantı cümlesini atayın.
Ayar dosyanızı aşağıdaki gibi oluşturabilirsiniz:

```
DISCORD_BOT_TOKEN=discord-bot-tokeninizi-buraya-yazin
MONGO_URI=mongodb+srv://kullanici-adi:sifre@example.com/tablo-adi
```

Botunuzu çalıştırmak için konsolda `node .` komutunu yazın.

## Dökümanlar

- [Discord Uygulamasının Kurulması](docs/BotKaydi.md)
  - [Discord Sunucusu Nasıl Açılır?](docs/BotKaydi.md#discord-sunucusu-nas%C4%B1l-a%C3%A7%C4%B1l%C4%B1r)
  - [Discord Uygulaması Oluşturma](docs/BotKaydi.md#discord-uygulamas%C4%B1-olu%C5%9Fturma)
  - [Bot Hesabının Ayarlanması](docs/BotKaydi.md#bot-hesab%C4%B1n%C4%B1n-ayarlanmas%C4%B1)
  - [Sunucuya Botun Davet Edilmesi](docs/BotKaydi.md#sunucuya-botun-davet-edilmesi)
- [Projenin Çalıştırılması](docs/ProjeninCalistirilmasi.md#gereksinimler)
  - [Gereksinimler](docs/ProjeninCalistirilmasi.md#gereksinimler)
  - [Kurulum ve Yapılandırma](docs/ProjeninCalistirilmasi.md#kurulum)
  - [Çalıştırma ve Kullanım](docs/ProjeninCalistirilmasi.md#baslatma)

## Özellikler

- Kayıt kodu verilen katılımcılar ayarlanan kayıt kanalındaki menü yardımıyla sisteme kolayca kayıt olabilirler.
- Kayıt kodu sistemde mevcut ise kullanıcıya ilgili rol atanır ve rolün sağladığı özellikler kullanılır hale gelir.
- Moderatörler moderasyon kanalında ayarla seçeneğini seçerek rollere mevcut kayıt kodlarını ekleyebilir veya yeni kod oluşturmasını sağlayabilirler.
- Yönetici botun çalıştırılmasından sonra /ayarlar komutunu kullanarak log, moderasyon ve kayıt kanallarını belirler. Kanal ayarları daha sonradan moderasyon kanalındaki menüden kolaylıkla güncellenebilir.

## Katkı Sağlayanlar

[Azat ESER](https://github.com/azateser)

[Bilgehan Zeki Özaytaç](https://github.com/WildGenie)

[Deniz Kaparlar](https://github.com/denizk1)

[Hasan Aydoğdu](https://github.com/haydogdu1990)

[Muhammed Mustafa Savar](https://github.com/muffafa)

[Uveys Gurbuz](https://github.com/uveysg)

## Davranış Kuralları

Bu toplulukta herkes için güvenli ve saygılı bir ortam sağlamak için [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) dosyasındaki kurallara uymanızı rica ederiz.

## Katkıda Bulunma

Projeye katkıda bulunmak istiyorsanız, lütfen [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını okuyun. Bu dosyada, projeye nasıl katkıda bulunabileceğiniz, kod yazma ve hata ayıklama talimatları, geri bildirim gönderme yönergeleri ve diğer konular yer alır.

## Lisans

Bu proje [MIT lisansı](https://choosealicense.com/licenses/mit/) altında lisanslanmıştır. Bu lisansın detayları için [LICENSE](LICENSE) dosyasına bakabilirsiniz.
