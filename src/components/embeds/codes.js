import { Colors, EmbedBuilder } from "discord.js";

export default {
  data: {
    name: `codes`,
  },
  generate(client, addedCodes, notAddedCodes) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setImage(client.user.displayAvatarURL()) // TODO: Resim figmadaki resimle değiştirilecek
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({
        url: "https://github.com/Kodluyoruz/discord-register-bot",
        iconURL: client.user.displayAvatarURL(),
        name: `Kodluyoruz Kayıt Botu`,
      })
      .setURL("https://github.com/Kodluyoruz/discord-register-bot");
    if (addedCodes.length > 0) {
      embed.addFields([
        {
          name: `Eklenen Kodlar`,
          value: addedCodes.join(", "), // TODO: codes will be displayed
          inline: false,
        },
      ]);
    }
    if (notAddedCodes.length) {
      embed.addFields([
        {
          name: `Sistemde Kayıtlı Kodlar`,
          value: notAddedCodes.join(", "), // TODO: codes will be displayed
          inline: false,
        },
      ]);
    }
    return embed;
  },
};
