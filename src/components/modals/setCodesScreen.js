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
   * @param {import("discord.js").Client} client
   * @param {String} roleId
   */
  async execute(interaction, client, roleId) {
    const codeInputText = interaction.fields.getTextInputValue("codesInput");

    const codeInput = codeInputText.split("\n").map((code) => {
      let codeParts = code.split("\t");
      return {
        codeId: codeParts[0].trim(),
        userName: codeParts[1]?.trim(),
        // roleName: codeParts[2]?.trim(),
      };
    });

    // // rol isimleriyle eşleşen rolidleri maple
    // const codeList = codeInput.map((code) => {
    //   const inputRoleId = code.roleName
    //     ? interaction.guild.roles.cache.find(
    //         (role) => role.name === code.roleName
    //       )?.id | roleId
    //     : roleId;
    //   return {
    //     codeId: code.codeId,
    //     userName: code.userName,
    //     roleId: inputRoleId,
    //   };
    // });

    const codes = await Code.addCodes(interaction.guildId, roleId, codeInput);

    // kaydedilen ve kaydedilemeyen kodlar
    const addedCodes = codes.inserted.map((code) => code.codeId);
    const notAddedCodes = codes.updated.map((code) => code.codeId);

    await interaction.deferUpdate({ ephemeral: true });

    await interaction.editReply({
      components: [
        new ActionRowBuilder().addComponents([downloadCodesButton.generate()]),
      ],
      embeds: [codesEmbed.generate(client, addedCodes, notAddedCodes)],
    });
  },
};
