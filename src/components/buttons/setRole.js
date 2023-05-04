import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  RoleSelectMenuBuilder,
} from "discord.js";

export default {
  data: {
    name: "setRole",
  },
  generate() {
    return new ButtonBuilder()
      .setCustomId("setRole")
      .setLabel("Kuruluma Başla")
      .setStyle(ButtonStyle.Success);
  },
  /**
   *
   * @param {ButtonInteraction} interaction
   */
  async execute(interaction) {
    const select = new RoleSelectMenuBuilder()
      .setCustomId("roleMenu")
      .setPlaceholder("Bir rol seç!");

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.deferReply({ ephemeral: true });

    await interaction.editReply({
      content: "Kod girişi sonrası kullanıcıya tanımlanacak rol",
      components: [row],
    });
  },
};
