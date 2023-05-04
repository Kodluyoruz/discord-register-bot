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
  generate() {
    return new ButtonBuilder()
      .setCustomId("setRegisterCodes")
      .setLabel("Kaydı Gerçekleştir")
      .setStyle(ButtonStyle.Success);
  },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   * @param {Client} client
   * @param {String} roleId
   */
  async execute(interaction, client, roleId) {
    const modal = new ModalBuilder()
      .setCustomId(`setCodesScreen-${roleId}`)
      .setTitle("Mevcut kodları gir");

    const textInput = new TextInputBuilder()
      .setCustomId("codesInput")
      .setLabel("Kodları virgül ile ayırarak girin.") // TODO:  Örnek: kodluyoruz1, kodluyoruz2, kodluyoruz3 FAZLA UZUN OLUYOR
      .setPlaceholder("Örnek: kodluyoruz1, kodluyoruz2, kodluyoruz3")
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(new ActionRowBuilder().addComponents(textInput));

    await interaction.showModal(modal);
  },
};
