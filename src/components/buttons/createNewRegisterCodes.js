import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export default {
  data: {
    name: "createNewRegisterCodes",
  },
  async execute(interaction, client, roleId) {
    const modal = new ModalBuilder()
      .setCustomId(`createCodesScreen-${roleId}`)
      .setTitle("Üretilecek kod adeti");

    const textInput = new TextInputBuilder()
      .setCustomId("codeNumberInput")
      .setLabel("Üretilecek toplam kod adetini seçin")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    modal.addComponents(new ActionRowBuilder().addComponents(textInput));

    await interaction.showModal(modal);
  },
};
