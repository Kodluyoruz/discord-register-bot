import { Colors, EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "settings",
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
          name: `Kodluyoruz Kayıt Botu Yardım Menüsüne`,
          value: `Aşağıdaki butonları kullanarak kuruluma başlamdan önce dökümanı okuyabilir ve kuruluma başlayabilirsiniz.`,
          inline: false,
        },
      ]);
  },
};
