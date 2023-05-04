import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export default {
  data: {
    name: "setRegistrationCode",
  },
  generate() {
    return new ButtonBuilder()
      .setCustomId("setRegistrationCode")
      .setLabel("Kayıt Ol")
      .setStyle(ButtonStyle.Success);
  },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("codeEntryScreen")
      .setTitle("Kayıt Kodu");

    const textCodeInput = new TextInputBuilder()
      .setCustomId("codeInput")
      .setLabel("Kayıt Kodunuz")
      .setPlaceholder("1000023456789")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const userName = interaction.guild.members.cache.get(
      interaction.user.id
    ).displayName;

    const textNameInput = new TextInputBuilder()
      .setCustomId("nameInput")
      .setLabel("Ad Soyad")
      .setPlaceholder("John Doe")
      .setValue(userName)
      .setRequired(false)
      .setStyle(TextInputStyle.Short);

    const codeActionRow = new ActionRowBuilder().addComponents(textCodeInput);
    const nameActionRow = new ActionRowBuilder().addComponents(textNameInput);
    modal.addComponents(codeActionRow, nameActionRow);

    await interaction.showModal(modal);
  },
};
