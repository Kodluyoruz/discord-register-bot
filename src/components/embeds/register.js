import { Colors, EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "register",
  },
  generate(iconUrl, thumbnailUrl) {
    return new EmbedBuilder()
      .setColor(Colors.Blue)
      .setImage(thumbnailUrl) // TODO: Resim figmadaki resimle değiştirilecek
      .setThumbnail(iconUrl)
      .setAuthor({
        url: "https://github.com/Kodluyoruz/discord-register-bot",
        iconURL: iconUrl,
        name: `Kodluyoruz Kayıt Botu`,
      })
      .setURL("https://github.com/Kodluyoruz/discord-register-bot")
      .addFields([
        {
          name: `Kayıt Ol`,
          value: `Kayıt işlemini tamamlamak için kayıdı gerçekleştir butonuna tıkladıktan sonra size verilen kodu açılacak olan pencereye giriniz.`,
          inline: false,
        },
      ]);
  },
};
