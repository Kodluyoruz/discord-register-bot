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
    name: "setRegisterCodes",
  },
  generate(interaction, client, role) {
    return new ButtonBuilder()
      .setCustomId(`setRegisterCodes-${role.id}`)
      .setLabel(`${role.name} için Kod Gir`)
      .setStyle(ButtonStyle.Success);
  },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   * @param {import("discord.js").Client} client
   * @param {String} roleId
   */
  async execute(interaction, client, roleId) {
    const modal = new ModalBuilder()
      .setCustomId(`setCodesScreen-${roleId}`)
      .setTitle("Mevcut kodları gir");

    const textInput = new TextInputBuilder()
      .setCustomId("codesInput")
      .setLabel("Kodları satırlara ayırarak girin.") // TODO:  Örnek: kodluyoruz1, kodluyoruz2, kodluyoruz3 FAZLA UZUN OLUYOR
      .setPlaceholder(
        "kodluyoruz1\nkodluyoruz2\n\nyada\n\nkodluyoruz1\tJhon Doe\nkodluyoruz2\tJane Doe"
      )
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(new ActionRowBuilder().addComponents(textInput));

    await interaction.showModal(modal);
  },
};
