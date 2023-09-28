import { ActionRowBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

import documentButton from "#components/buttons/links/document";
import setChannelsButton from "#components/buttons/setChannels";
import setRoleButton from "#components/buttons/setRole";
import setupEmbed from "#components/embeds/settings";

export default {
  data: new SlashCommandBuilder()
    .setName("kurulum")
    .setDescription("Kurulum menüsünü açar.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   * Executes the Command
   * @param {import("discord.js").CommandInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async execute(interaction, client) {
    if (!client.user) {
      return;
    }
    const iconUrl = client.user.displayAvatarURL();
    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([
          documentButton.generate(client.documentUrl),
          setRoleButton.generate(),
          setChannelsButton.generate(),
        ]),
      ],
      ephemeral: true,
      embeds: [setupEmbed.generate(iconUrl, client.thumbnailUrl, client.documentUrl)],
    });
  },
};
