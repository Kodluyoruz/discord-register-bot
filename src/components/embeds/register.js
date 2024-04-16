import { Colors, EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "register",
  },
  generate(iconUrl, thumbnailUrl, documentUrl) {
    return new EmbedBuilder()
      .setColor(Colors.Blue)
      .setImage(thumbnailUrl) // TODO: Resim figmadaki resimle değiştirilecek
      .setThumbnail(iconUrl)
      .setAuthor({
        url: documentUrl,
        iconURL: iconUrl,
        name: `Kodluyoruz Kayıt Botu`,
      })
      .setURL(documentUrl)
      .addFields([
        {
          name: `Kayıt Ol`,
          value: `Kayıt işlemini tamamlamak için kayıdı gerçekleştir butonuna tıkladıktan sonra, bu sunucuya katılmanızı sağlayan mailde size verilen kodu, açılacak olan pencereye giriniz.\n\n:warning: Lütfen kodu girerken başında ve sonunda boşluk olmadığından emin olun!`,
          inline: false,
        },
      ]);
  },
};
