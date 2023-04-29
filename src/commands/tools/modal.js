const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Bir modal döndürür"),

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("codeEntryScreen")
      .setTitle("Kayıt Kodu");

    const textInput = new TextInputBuilder()
      .setCustomId("codeInput")
      .setLabel("Kayıt Kodunuz")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    modal.addComponents(new ActionRowBuilder().addComponents(textInput));

    await interaction.showModal(modal);
  },
};
