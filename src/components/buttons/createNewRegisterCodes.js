import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export default {
  data: {
    name: "createNewRegisterCodes",
  },
  generate(interaction, client, role) {
    return new ButtonBuilder()
      .setCustomId(`createNewRegisterCodes-${role.id}`)
      .setLabel(`${role.name} Rolü İçin Kod Üret`)
      .setStyle(ButtonStyle.Success);
  },
  // Generate a modal to get the number of codes to be created
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   * @param {import("discord.js").Client} client
   * @param {number} roleId
   */
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
