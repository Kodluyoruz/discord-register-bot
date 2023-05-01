// TODO: It will be merged with settings.js and it will be render depend of settings. This command will be removed

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
    .setName("kurulum")
    .setDescription("Kurulum menüsünü açar."),

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

    const setRoleButton = new ButtonBuilder()
      .setCustomId("setRole")
      .setLabel("Kuruluma Başla")
      .setStyle(ButtonStyle.Success);

    const setChannelesButton = new ButtonBuilder()
      .setCustomId("setChannels")
      .setLabel("Ayarları Düzenle")
      .setStyle(ButtonStyle.Secondary);

    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([
          docsButton,
          setRoleButton,
          setChannelesButton,
        ]),
      ],
      embeds: [embed],
    });
  },
};
