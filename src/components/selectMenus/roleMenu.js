import { ActionRowBuilder } from "discord.js";
import setRegisterCodesButton from "../buttons/setRegisterCodes.js";
import createNewRegisterCodesButton from "../buttons/createNewRegisterCodes.js";
import getRegisterCodesButton from "../buttons/getRegisterCodes.js";

export default {
  data: {
    name: `roleMenu`,
  },
  /**
   * Executes the Select
   * @param {import("discord.js").RoleSelectMenuInteraction} interaction
   */
  async execute(interaction, client) {
    const role = interaction.roles.first();

    await interaction.deferUpdate({ ephemeral: true });

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
