import { ActionRowBuilder, SlashCommandBuilder } from "discord.js";

import setChannelsButton from "../../components/buttons/setChannels.js";
import settingsEmbed from "../../components/embeds/settings.js";
import documentButton from "../../components/buttons/links/document.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ayarlar")
    .setDescription("Ayarlar menüsünü açar."),

  async execute(interaction, client) {
    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([
          documentButton.generate(),
          setChannelsButton.generate(),
        ]),
      ],
      embeds: [settingsEmbed.generate(client, interaction)],
    });
  },
};
