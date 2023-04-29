const {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ayarlar")
    .setDescription("Ayarlar menüsünü açar."),

  async execute(interaction) {
    const docsButton = new ButtonBuilder()
      .setLabel("Dökümantasyon")
      .setURL('https://github.com/Kodluyoruz/discord-register-bot')
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
      components: [new ActionRowBuilder().addComponents([docsButton, setRoleButton, setChannelButton])],
    });
  },
};
