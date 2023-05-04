import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: {
    name: `roleMenu`,
  },
  /**
   * Executes the Select
   * @param {import("discord.js").RoleSelectMenuInteraction} interaction
   */
  async execute(interaction) {
    const inputRole = interaction.roles.first();
    const setRegisterCodesButton = new ButtonBuilder()
      .setCustomId(`setRegisterCodes-${inputRole.id}`)
      .setLabel(`${inputRole.name} Rolü İçin Mevcut Kodları Gir`)
      .setStyle(ButtonStyle.Success);

    const createNewRegisterCodesButton = new ButtonBuilder()
      .setCustomId(`createNewRegisterCodes-${inputRole.id}`)
      .setLabel(`${inputRole.name} Rolü İçin Kod Üret`)
      .setStyle(ButtonStyle.Success);

    await interaction.deferUpdate({ ephemeral: true });

    await interaction.editReply({
      components: [
        new ActionRowBuilder().addComponents([
          setRegisterCodesButton,
          createNewRegisterCodesButton,
        ]),
      ],
      ephemeral: true,
    });
  },
};
