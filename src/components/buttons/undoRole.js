import { ButtonBuilder, ButtonStyle } from "discord.js";

import Code from "#schemas/code";

export default {
  data: {
    name: "undoRole",
  },
  generate(codeId) {
    return new ButtonBuilder()
      .setCustomId(`undoRole-${codeId}`)
      .setLabel("Rol Atamasını Geri Al")
      .setStyle(ButtonStyle.Success);
  },
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  async execute(interaction, client, codeId) {
    if (!client.user) {
      return;
    }

    await interaction.deferUpdate();

    const { message } = interaction;

    const oldButton = message.components[0].components[0];
    oldButton.data.disabled = true;
    oldButton.data.label = "Rol Ataması Geri Alındı";

    const oldEmbed = message.embeds[0];

    const fieldText = oldEmbed.fields[0].value
      .split("\n")
      .map((line) => `~~${line}~~`)
      .join("\n");

    oldEmbed.fields[0].value = fieldText;

    const code = await Code.getByCodeId(interaction.guildId, codeId);

    if (!code || !code.userId) {
      return;
    }

    const member = await interaction.guild.members.fetch(code.userId);

    if (!member) {
      return;
    }

    const roles = [];
    code.roleIds.forEach((r) => {
      const role = interaction.guild.roles.cache.get(r);
      if (role && !member.roles.cache.has(r)) {
        roles.push(role);
      }
    });

    await member.roles.remove(code.roleIds);

    await Code.updateCodeUserId(interaction.guildId, codeId, null);

    await interaction.editReply({
      components: message.components,
      embeds: [oldEmbed],
    });
  },
};
