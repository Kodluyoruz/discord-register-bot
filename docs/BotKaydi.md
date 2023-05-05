# Discord Bot Uygulaması Talimatları

## İçindekiler

- [Discord Sunucusu Nasıl Açılır?](#discord-sunucusu-nasıl-açılır)
- [Discord Uygulaması Oluşturma](#discord-uygulaması-oluşturma)
- [Bot Hesabının Ayarlanması](#bot-hesabının-ayarlanması)
- [Sunucuya Botun Davet Edilmesi](#sunucuya-botun-davet-edilmesi)

## Discord Sunucusu Nasıl Açılır?

- Uygulama içerisindeki sunucu listesinin gözüktüğü sol çubuktaki **Bir sunucu ekle** ismindeki butonuna tıklanır.
- **Bir sunucu oluştur** isimli ekran karşınıza çıktığında isteklerinize en uygun sunucu oluşturma seçeneği seçilerek devam edilir.
- **Bize sunucundan biraz bahset** isimli ekran karşınıza çıktığında sunucunuzun kullanım amacına göre seçeneklerden biri seçilerek butona tıklanır.
- **Sunucunu özelleştir** ekranında ise sunucu ismi ve görseli işlemleri ayarlanabilmektedir. Bu özelleştirmeler yapıldıktan sonra oluştur butonuna tıklanarak sunucu oluşturma işlemi gerçekleştirilir.
- Discord sunucusu açılmıştır.

## Discord Uygulaması Oluşturma

- [Discord Developer Portal](https://discord.com/developers/applications) bağlantısına tıklayarak aplikasyon oluşturma sayfasına gidebilirsiniz. Eğer daha önceden discord hesabınıza bağlanmadıysanız hesabınıza giriş sayfasına yönlendirecektir.
- E-posta ve şifreyi girip discord hesabınıza ulaştığınızda **Developer Portal** ismindeki discord sayfasına girmiş olacaksınız.
- **Developer Portal** sayfasında sağ üst köşede bulunan **New Application** butonuna tıklayarak yeni bir aplikasyon oluşturabilirsiniz. Hali hazırda daha önceden oluşturmuş olduğunuz aplikasyonlar var ise sol çubukta bulunan **Aplications**'a tıklanarak listelenir.
- **New Application** butonuna tıkladığınızda **Create An Application** penceresi açılır. Bu pencere içerisinde aplikasyonunuzun ismini yazarak ve **Create** butonuna tıklayarak aplikasyonunuzu oluşturabilirsiniz.
- Açılan ****General Information**** kısmından uygulamanızın ismini, resmini ve açıklamasını ayarlayın.

## Bot Hesabının Ayarlanması

- Sol menüden **Bot** sekmesine tıklayın. Botunuzun ismini ve resmini ayarlayın.
- **Reset Token** butonuna tıklayıp **Token** kısmından botunuzun tokenini kopyalayın.  Bu tokeni uygulamamızın `.env` dosyası içinde `DISCORD_BOT_TOKEN` olarak kaydedilmesi gerekmektedir.
- Dilerseniz **PUBLIC BOT** özelliği açabilirsiniz. Bu özellik botunuzun herkes tarafından davet edilebilir olmasını sağlar. Bu özelliği açarsanız, botunuzun davet URL’sini paylaştığınız herkes botunuzu kendi sunucularına ekleyebilir.
- **Privileged Gateway Intents** kısmından **PRESENCE INTENT**, **SERVER MEMBERS INTENT** ve **MESSAGE CONTENT INTENT** özelliklerini açın. Bu özellikler botunuzun sunucudaki kullanıcıların durumlarını, üyelerini ve mesaj içeriklerini almasını sağlar.

## Sunucuya Botun Davet Edilmesi

- Bot hesabınızı oluşturduktan sonra sol menüden **OAuth2** sekmesine tıklayın.
- **Authorization Method** kısmından **In-app Authorization** seçeneğini seçin. Bu seçenek botunuzu davet etmek için bir URL oluşturur.
- **Scopes** kısmından **bot** ve **applications.commands** seçeneklerini işaretleyin. Bu seçenekler botunuzun sunucuya katılmasını ve komutları kullanmasını sağlar.
- **Bot Permissions** kısmından botunuzun sunucuda sahip olmasını istediğiniz izinleri seçin. Örneğin, **Administrator** seçeneğini işaretlerseniz botunuz sunucuda her şeyi yapabilir. Dilerseniz sadece botun ihtiyaç duyacağı özellikleri aktive edebilirsiniz. Eksik ayarların botun çalışmasını engelleyeceğini unutmayın.
- OAuth2 sekmesinin altındaki URL Generator sekmesine tıklayın. Yeni açılan sekmede tekrar **Scopes** kısmından **bot** ve **applications.commands** seçeneklerini işaretleyin.  **Bot Permissions** kısmından **Administrator** seçeneğini işaretleyin. **GENERATED URL** altında oluşan URL’yi kopyalayın ve yeni bir sekmede açın.
- Açılan sayfada botunuzu davet etmek istediğiniz sunucuyu seçin ve **Authorize** butonuna tıklayın.
- Botunuz sunucunuza başarıyla davet edilmiştir.
