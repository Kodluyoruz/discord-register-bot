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
          value: `Kayıt işlemini tamamlamak için kayıdı gerçekleştir butonuna tıkladıktan sonra size verilen kodu açılacak olan pencereye giriniz.`,
          inline: false,
        },
      ]);
  },
};
