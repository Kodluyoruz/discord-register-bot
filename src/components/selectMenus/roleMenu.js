import { ActionRowBuilder } from "discord.js";

import createNewRegisterCodesButton from "#components/buttons/createNewRegisterCodes";
import deleteRegisterCodesButton from "#components/buttons/deleteRegisterCodes";
import getRegisterCodesButton from "#components/buttons/getRegisterCodes";
import setRegisterCodesButton from "#components/buttons/setRegisterCodes";

export default {
  data: {
    name: `roleMenu`,
  },
  /**
   * Executes the Select
   * @param {import("discord.js").RoleSelectMenuInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async execute(interaction, client) {
    const role = interaction.roles.first();

    const roleEmbed = await interaction.deferUpdate({ fetchReply: true });

    const codeButtonsRow = new ActionRowBuilder();

    codeButtonsRow.addComponents(setRegisterCodesButton.generate(interaction, client, role));
    if (client.createCode) {
      codeButtonsRow.addComponents(
        createNewRegisterCodesButton.generate(interaction, client, role)
      );
    }
    codeButtonsRow.addComponents(getRegisterCodesButton.generate(interaction, client, role));
    codeButtonsRow.addComponents(deleteRegisterCodesButton.generate(interaction, client, role));

    await interaction.editReply({
      content: `Seçilen rol: ${role.name}`,
      components: [roleEmbed.components[0], codeButtonsRow],
      ephemeral: true,
    });
  },
};
