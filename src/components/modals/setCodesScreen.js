import Code from "../../schemas/code.js";
import { ActionRowBuilder, Colors, EmbedBuilder } from "discord.js";

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
        roleIds: [roleId],
        data: {
          userName: codeParts[1]?.trim(),
        },
      };
    });

    const { updatedCodes, newCodes, updatedUsers } =
      await Code.addOrUpdateGuildCodes(interaction.guildId, codeInput);

    for (const code of updatedUsers) {
      const member = await interaction.guild.members.fetch(code.userId);

      const { addedRoleIds, removedRoleIds } = code;

      const addedRoles = addedRoleIds.map((roleId) =>
        interaction.guild.roles.cache.get(roleId)
      );

      const removedRoles = removedRoleIds.map((roleId) =>
        interaction.guild.roles.cache.get(roleId)
      );

      await member.roles.add(addedRoles);
      await member.roles.remove(removedRoles);
    }

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
