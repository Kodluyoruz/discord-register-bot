import { ActionRowBuilder } from "discord.js";

import createNewRegisterCodesButton from "#components/buttons/createNewRegisterCodes";
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

    await interaction.deferReply({ ephemeral: true });

    await interaction.editReply({
      components: [
        new ActionRowBuilder().addComponents([
          setRegisterCodesButton.generate(interaction, client, role),
          createNewRegisterCodesButton.generate(interaction, client, role),
          getRegisterCodesButton.generate(interaction, client, role),
        ]),
      ],
      ephemeral: true,
    });
  },
};
