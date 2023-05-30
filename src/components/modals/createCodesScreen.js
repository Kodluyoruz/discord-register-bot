import Code from "../../schemas/code.js";
import { AttachmentBuilder } from "discord.js";

import codesEmbed from "../embeds/codes.js";

import generateCsv from "../../helpers/cvs.js";

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

    const csv = generateCsv(client, interaction.guild, newCodes, updatedCodes, updatedUsers);

    const dateString = new Date().toISOString().split("T")[0];

    const csvAttachment = new AttachmentBuilder(Buffer.from(csv), {
      name: `${interaction.guild.name}_${dateString}_codes.csv`,
      description: "Exported codes",
    });

    await interaction.editReply({
      embeds: [
        await codesEmbed.generate(
          client,
          interaction.guild,
          updatedCodes,
          newCodes,
          updatedUsers
        ),
      ],
      files: [csvAttachment],
    });
  },
};
