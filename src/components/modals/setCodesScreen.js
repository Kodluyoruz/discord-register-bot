import Code from "../../schemas/code.js";
import { AttachmentBuilder } from "discord.js";

import codesEmbed from "../embeds/codes.js";
import generateCsv from "../../helpers/cvs.js";

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

    const csv = generateCsv(
      client,
      interaction.guild,
      newCodes,
      updatedCodes,
      updatedUsers
    );

    const dateString = new Date().toISOString().split("T")[0];

    const csvAttachment = new AttachmentBuilder(Buffer.from(csv), {
      name: `${interaction.guild.name}_${dateString}_codes.csv`,
      description: "Exported codes",
    });

    await interaction.editReply({
      embeds: [
        await codesEmbed.generate(client, updatedCodes, newCodes, updatedUsers),
      ],
      files: [csvAttachment],
    });
  },
};
