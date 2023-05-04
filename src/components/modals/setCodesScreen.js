import Code from "../../schemas/code.js";
import { ActionRowBuilder } from "discord.js";

import downloadCodesButton from "../buttons/downloadCodes.js";
import codesEmbed from "../embeds/codes.js";

export default {
  data: {
    name: "setCodesScreen",
  },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   * @param {Client} client
   * @param {String} roleId
   */

  async execute(interaction, client, roleId) {
    const codeInput = interaction.fields
      .getTextInputValue("codesInput")
      .split(",");

    const codes = await Code.addCode(interaction.guildId, roleId, codeInput);

    // kaydedilen ve kaydedilemeyen kodlar
    const addedCodes = codes.map((code) => code.codeId);
    const notAddedCodes = codeInput.filter(
      (code) => !addedCodes.includes(code)
    );

    await interaction.deferUpdate({ ephemeral: true });

    await interaction.editReply({
      components: [
        new ActionRowBuilder().addComponents([downloadCodesButton.generate()]),
      ],
      embeds: [codesEmbed.generate(client, addedCodes, notAddedCodes)],
    });
  },
};
