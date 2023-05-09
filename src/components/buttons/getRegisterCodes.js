import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

import Code from "../../schemas/code.js";
import downloadsCodesButton from "../buttons/downloadCodes.js";
import codesEmbed from "../embeds/codes.js";

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
    const codes = await Code.getByRole(interaction.guildId, roleId);

    // kaydedilen ve kaydedilemeyen kodlar
    const addedCodes = codes.map((code) => code.codeId);

    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([downloadsCodesButton.generate()]),
      ],
      embeds: [codesEmbed.generate(client, addedCodes, [])],
    });
  },
};
