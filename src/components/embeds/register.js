import { Colors, EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "register",
  },
  generate(client) {
    return new EmbedBuilder()
      .setColor(Colors.Blue)
      .setImage(client.user.displayAvatarURL()) // TODO: Resim figmadaki resimle değiştirilecek
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({
        url: "https://github.com/Kodluyoruz/discord-register-bot",
        iconURL: client.user.displayAvatarURL(),
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
