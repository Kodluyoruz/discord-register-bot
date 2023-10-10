import { AttachmentBuilder } from "discord.js";

import { Buffer } from "node:buffer";

import codesEmbed from "#components/embeds/codes";
import generateCsv from "#helpers/csv";
import { userRoleLog } from "#helpers/guildLogger";
import Code from "#schemas/code";

/**
 * @typedef {Object} UserCodeData
 * @property {string} codeId - The ID of the code.
 * @property {Array<string>} addedRoleIds - The IDs of the roles added to the user.
 * @property {Array<string>} removedRoleIds - The IDs of the roles removed from the user.
 * @property {Array<string>} notUpdatedRoleIds - The IDs of the roles that were not updated.
 * @property {{userName: string | undefined}} [data] - The data of the code.
 * @property {string} [userId] - The ID of the user.
 */

export default {
  data: {
    name: "deleteCodesScreen",
  },
  /**
   *
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   * @param {import("discord.js").Client} client
   * @param {String} roleId
   */
  async execute(interaction, client) {
    if (!interaction.inCachedGuild()) {
      interaction.reply({
        content: "Bu komut sadece sunucularda kullanılabilir",
        ephemeral: true,
      });
      return;
    }

    const codeInputText = interaction.fields.getTextInputValue("codesInput");

    const codeInput = codeInputText.split("\n").map((code) => {
      const codeParts = code.split("\t");
      return {
        codeId: codeParts[0].trim(),
      };
    });

    const { deletedCodes, deletedUsers } = await Code.deleteGuildCodes(
      interaction.guildId,
      codeInput
    );

    for (const code of deletedUsers) {
      if (!code.userId) {
        continue;
      }
      const member =
        interaction.guild.members.cache.get(code.userId) ||
        (await interaction.guild.members.fetch(code.userId).catch(() => {}));

      if (!member) {
        continue;
      }

      const { removedRoleIds = [], codeId } = code;

      /**
       * @type {import("discord.js").Role[]}
       */
      const deletedRoles = [];

      removedRoleIds.forEach((r) => {
        const role = interaction.guild.roles.cache.get(r);
        if (role) {
          deletedRoles.push(role);
        }
      });

      await userRoleLog(client, interaction.guild, member, deletedRoles, codeId, "admin-delete");
      try {
        await member.roles.remove(deletedRoles);
      } catch (e) {
        client.logger.error(e);
      }
    }

    await interaction.deferUpdate();

    const csv = await generateCsv(client, interaction.guild, [], [], deletedUsers, deletedCodes);

    const dateString = new Date().toISOString().split("T")[0];

    const csvAttachment = new AttachmentBuilder(Buffer.from(csv, "utf8"), {
      name: `${interaction.guild.name}_${dateString}_codes.csv`,
      description: "Exported codes",
    });

    await interaction.editReply({
      embeds: [await codesEmbed.generate(client, [], [], deletedUsers, deletedCodes)],
      files: [csvAttachment],
    });
  },
};
