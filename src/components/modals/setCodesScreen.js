import { AttachmentBuilder } from "discord.js";

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
    name: "setCodesScreen",
  },
  /**
   *
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   * @param {import("discord.js").Client} client
   * @param {String} roleId
   */
  async execute(interaction, client, roleId) {
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
        roleIds: [roleId],
        data: {
          userName: codeParts[1]?.trim(),
        },
      };
    });

    const { updatedCodes, newCodes, updatedUsers } = await Code.addOrUpdateGuildCodes(
      interaction.guildId,
      codeInput
    );

    await Promise.all(
      updatedUsers.map(async (code) => {
        if (!code.userId) {
          return;
        }
        const member =
          interaction.guild.members.cache.get(code.userId) ||
          (await interaction.guild.members.fetch(code.userId).catch(() => null));

        if (!member) {
          return;
        }

        const { addedRoleIds = [], notUpdatedRoleIds = [] } = code;

        /**
         * @type {import("discord.js").Role[]}
         */
        const addedRoles = [];

        addedRoleIds.forEach((r) => {
          const role = interaction.guild.roles.cache.get(r);
          if (role) {
            addedRoles.push(role);
          }
        });

        notUpdatedRoleIds.forEach((r) => {
          const role = interaction.guild.roles.cache.get(r);
          if (role && !member.roles.cache.has(r)) {
            addedRoles.push(role);
          }
        });

        if (!addedRoles.length) {
          return;
        }

        userRoleLog(
          client,
          interaction.guild,
          member.displayAvatarURL(),
          member.displayName,
          addedRoles
        );

        await member.roles.add(addedRoles);
      })
    );

    await interaction.deferUpdate();

    const csv = await generateCsv(client, interaction.guild, newCodes, updatedCodes, updatedUsers);

    const dateString = new Date().toISOString().split("T")[0];

    const csvAttachment = new AttachmentBuilder(Buffer.from(csv), {
      name: `${interaction.guild.name}_${dateString}_codes.csv`,
      description: "Exported codes",
    });

    await interaction.editReply({
      embeds: [await codesEmbed.generate(client, updatedCodes, newCodes, updatedUsers)],
      files: [csvAttachment],
    });
  },
};
