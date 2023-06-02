import { AttachmentBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

import Code from "../../schemas/code.js";
import codesEmbed from "../embeds/codes.js";
import generateCsv from "../../helpers/cvs.js";

export default {
  data: {
    name: "getRegisterCodes",
  },
  generate(interaction, client, role) {
    return new ButtonBuilder()
      .setCustomId(`getRegisterCodes-${role.id}`)
      .setLabel(`${role.name} için eklenmiş Kodları Getir`)
      .setStyle(ButtonStyle.Success);
  },
  async execute(interaction, client, roleId) {
    const { usersCodes, unusedCodes } = await Code.getByRoleId(
      interaction.guildId,
      roleId
    );

    await interaction.deferUpdate({ ephemeral: true });

    const csv = await generateCsv(
      client,
      interaction.guild,
      unusedCodes,
      [],
      usersCodes
    );

    const dateString = new Date().toISOString().split("T")[0];

    const csvAttachment = new AttachmentBuilder(Buffer.from(csv), {
      name: `${interaction.guild.name}_${dateString}_codes.csv`,
      description: "Exported codes",
    });

    await interaction.editReply({
      embeds: [await codesEmbed.generate(client, [], unusedCodes, usersCodes)],
      files: [csvAttachment],
    });
  },
};
