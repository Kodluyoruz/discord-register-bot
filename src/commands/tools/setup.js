// TODO: It will be merged with settings.js and it will be render depend of settings. This command will be removed

import { ActionRowBuilder, SlashCommandBuilder } from "discord.js";

import setupEmbed from "../../components/embeds/settings.js";
import setRoleButton from "../../components/buttons/setRole.js";
import setChannelsButton from "../../components/buttons/setChannels.js";
import documentButton from "../../components/buttons/links/document.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kurulum")
    .setDescription("Kurulum menüsünü açar."),

  async execute(interaction, client) {
    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([
          documentButton.generate(),
          setRoleButton.generate(),
          setChannelsButton.generate(),
        ]),
      ],
      ephemeral: true,
      embeds: [setupEmbed.generate(client, interaction)],
    });
  },
};
