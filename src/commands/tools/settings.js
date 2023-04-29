const {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  EmbedBuilder,
  Colors,
} = require("discord.js");

module.exports = {
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

    const setRoleButton = new ButtonBuilder()
      .setCustomId("setRole")
      .setLabel("Kuruluma Başla")
      .setStyle(ButtonStyle.Success);

    const setChannelButton = new ButtonBuilder()
      .setCustomId("setChannel")
      .setLabel("Ayarları Düzenle")
      .setStyle(ButtonStyle.Secondary);

    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([
          docsButton,
          setRoleButton,
          setChannelButton,
        ]),
      ],
      embeds: [embed],
    });
  },
};
