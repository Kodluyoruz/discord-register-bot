//TODO: This will render buttons label and theri style depending on their status.

import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import setRegChannelButton from "./setRegChannel.js";
import setModChannelButton from "./setModChannel.js";
import setLogChannelButton from "./setLogChannel.js";

export default {
  data: {
    name: "setChannels",
  },
  generate() {
    return new ButtonBuilder()
      .setCustomId("setChannels")
      .setLabel("Ayarları Düzenle")
      .setStyle(ButtonStyle.Secondary);
  },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   * @param {Client} client
   */
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    await interaction.editReply({
      components: [
        new ActionRowBuilder().addComponents([
          setRegChannelButton.generate(interaction, client),
          setModChannelButton.generate(interaction, client),
          setLogChannelButton.generate(interaction, client),
        ]),
      ],
      ephemeral: true,
    });
  },
};
