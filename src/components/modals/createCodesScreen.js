import Code from "../../schemas/code.js";
import { ActionRowBuilder } from "discord.js";

import downloadCodesButton from "../buttons/downloadCodes.js";
import codesEmbed from "../embeds/codes.js";

export default {
  data: {
    name: "createCodesScreen",
  },

  /**
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   * @param {import("discord.js").Client} client
   * @param {String} roleId
   */
  async execute(interaction, client, roleId) {
    // TODO: check if code number input is valid (is it a number?)

    const codeCount = parseInt(
      interaction.fields.getTextInputValue("codeNumberInput")
    );

    const codeInputIds = [];
    for (let i = 0; i < codeCount; i++) {
      codeInputIds.push(Math.floor(100000000 + Math.random() * 900000000));
    }

    const { updatedCodes, newCodes, updatedUsers } =
      await Code.addOrUpdateGuildCodes(
        interaction.guildId,
        codeInputIds.map((code) => ({
          codeId: code,
          roleIds: [roleId],
        }))
      );

    await interaction.deferUpdate({ ephemeral: true });

    await interaction.editReply({
      components: [
        new ActionRowBuilder().addComponents([downloadCodesButton.generate()]),
      ],
      embeds: [
        await codesEmbed.generate(client, updatedCodes, newCodes, updatedUsers),
      ],
    });
  },
};
