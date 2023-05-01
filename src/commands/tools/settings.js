import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ayarlar")
    .setDescription("Ayarlar menüsünü açar."),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setImage(client.user.displayAvatarURL()) // TODO: Resim figmadaki resimle değiştirilecek
      .setThumbnail(interaction.user.displayAvatarURL())
      .setAuthor({
        url: "https://github.com/Kodluyoruz/discord-register-bot",
        iconURL: client.user.displayAvatarURL(),
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

    const docsButton = new ButtonBuilder()
      .setLabel("Dökümantasyon")
      .setURL("https://github.com/Kodluyoruz/discord-register-bot")
      .setStyle(ButtonStyle.Link);

    const setChannelesButton = new ButtonBuilder()
      .setCustomId("setChannels")
      .setLabel("Ayarlar")
      .setStyle(ButtonStyle.Primary);

    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([docsButton, setChannelesButton]),
      ],
      embeds: [embed],
    });
  },
};
