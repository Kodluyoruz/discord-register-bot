import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export default {
  data: {
    name: "setRegisterationCode",
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("codeEntryScreen")
      .setTitle("Kayıt Kodu");

    const textCodeInput = new TextInputBuilder()
      .setCustomId("codeInput")
      .setLabel("Kayıt Kodunuz")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const textNameInput = new TextInputBuilder()
      .setCustomId("nameInput")
      .setLabel("Ad Soyad")
      .setRequired(false)
      .setStyle(TextInputStyle.Short);

    const codeActionRow = new ActionRowBuilder().addComponents(textCodeInput);
    const nameActionRow = new ActionRowBuilder().addComponents(textNameInput);
    modal.addComponents(codeActionRow, nameActionRow);

    await interaction.showModal(modal);
  },
};
