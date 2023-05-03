# Discord Kayıt Botu
![Coming Soon](https://img.shields.io/badge/Status-Coming%20Soon-blue)

## Proje Açıklaması
Kodluyoruz Discord Kayıt Botu, Kullanıcılara verilen kayıt kodu ile sunucuya kayıt ve rol tanımlama yapabilen bir Discord botudur. Yeni kayıt kodları üretilebilir, log, moderasyon ve kayıt kanalları belirlenebilir.

Projede Discord.js, dotenv, i18next, mongoose, winston kütüphaneleri kullanılmıştır. [Node.js](https://nodejs.org/en/download)'in güncel sürümüne, [MongoDB](https://www.mongodb.com/) veritabanına, [Discord Bot Kaydına](docs/BotKaydi.md) ihtiyaç duyar.

## Başlangıç



### Proje Nasıl Kurulur ve Çalıştırılır

"git clone" komutu ile projeyi çalışma dizininize kopyasını alın 
```sh
git clone https://github.com/Kodluyoruz/discord-register-bot.git
```

veya githup "Code" butonuna ardından "Download ZIP" butonuna tıklayarak projeyi cihazınıza indirebilir ve zip dosyasının içeriğini çalışma dizininize aktarabilirsiniz.


Kurulum için çalışma dizininizde terminalde aşağıdaki kodu çalıştırın.
```sh
npm install
```
Projenin çalışması için gerekli ayarlar için aşağıdaki linkten "ProjeninCalistirilmasi.md" dosyasına göz atabilirsiniz.
#### [Proje Nasıl Çalıştırılır?](docs/ProjeninCalistirilmasi.md)

### Ayarlar

```sh
token=<Discord Application Bot Token>
DB_URI=mongodb+srv://<kullanıcı>:<şifre>@<sunucu>/<table>
```

### Gereksinimler

- Discord.js v14 için Node.js 16.9.0 veya daha yeni bir sürümü gereklidir.

## Özellikler

- Sunucuya katılan kullanıcılara kayıt kanalında kayıt olma seçeneği sunar.
- Kullanıcılar kayıt kanalında kayıt ol seçeneğini seçerek kendilerine verilen kayıt kodunu girerler.
- Kayıt kodu sistemde mevcut ise, kullanıcıya ilgili rol atanır ve sunucunun diğer bölümlerine erişim izni verilir.
- Kayıt kodu sistemde mevcut değilse, kullanıcıya hata mesajı gösterilir ve tekrar deneme talep edilir.
- Moderatörler moderasyon kanalında ayarla seçeneğini seçerek rollere yeni kayıt kodları ekleyebilir veya silebilirler. Açılan menüden rol listesini seçerek kayıt kodunu girerler.
- Yönetici botu ilk kurduğunda /ayarlar komutunu kullanarak log, moderasyon ve kayıt kanallarını belirler.

## Katkı Sağlayanlar

Bilgehan Zeki Özaytaç [WildGenie](https://github.com/WildGenie)
<br/>
Hasan Aydoğdu [haydogdu1990](https://github.com/haydogdu1990) 
<br/>
Muhammed Musatafa Savar [muffafa](https://github.com/muffafa)
<br/>
Uveys Gurbuz [uveysg](https://github.com/uveysg)
<br/>
Deniz Kaparlar [denizk1](https://github.com/denizk1)
<br/>
Azat ESER [azateser](https://github.com/azateser)
<br/>
## Dökümanlar

## Lisans

