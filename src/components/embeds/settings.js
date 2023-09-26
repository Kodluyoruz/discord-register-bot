import { Colors, EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "settings",
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
          name: `Kodluyoruz Kayıt Botu Yardım Menüsüne`,
          value: `Aşağıdaki butonları kullanarak kuruluma başlamdan önce dökümanı okuyabilir ve kuruluma başlayabilirsiniz.`,
          inline: false,
        },
      ]);
  },
};
