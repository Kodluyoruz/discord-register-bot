import { AttachmentBuilder } from "discord.js";

import { Buffer } from "node:buffer";

import codesEmbed from "#components/embeds/codes";
import generateCsv from "#helpers/csv";
import Code from "#schemas/code";

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
    if (!interaction.inCachedGuild()) {
      interaction.reply({
        content: "Bu komut sadece sunucularda kullanılabilir",
        ephemeral: true,
      });
      return;
    }

    const codeCount = parseInt(interaction.fields.getTextInputValue("codeNumberInput"), 10);

    const codeInputIds = [];
    for (let i = 0; i < codeCount; i += 1) {
      codeInputIds.push(Math.floor(100_000_000 + Math.random() * 900_000_000));
    }

    const { updatedCodes, newCodes, updatedUsers } = await Code.addOrUpdateGuildCodes(
      interaction.guildId,
      codeInputIds.map((code) => ({
        codeId: code,
        roleIds: [roleId],
      }))
    );

    await interaction.deferUpdate();

    const csv = await generateCsv(client, interaction.guild, newCodes, updatedCodes, updatedUsers);

    const dateString = new Date().toISOString().split("T")[0];

    const csvAttachment = new AttachmentBuilder(Buffer.from(csv, "utf8"), {
      name: `${interaction.guild.name}_${dateString}_codes.csv`,
      description: "Exported codes",
    });

    await interaction.editReply({
      embeds: [await codesEmbed.generate(client, updatedCodes, newCodes, updatedUsers)],
      files: [csvAttachment],
    });
  },
};
