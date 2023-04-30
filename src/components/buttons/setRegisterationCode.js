const {
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
  } = require("discord.js");

module.exports = {
    data: {
      name: "setRegisterationCode",
    },
    // eslint-disable-next-line no-unused-vars
    async execute(interaction, client) {
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
  