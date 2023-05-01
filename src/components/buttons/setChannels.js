//TODO: This will render buttons label and theri style depending on their status.

import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: {
    name: "setChannels",
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const setRegChannelButton = new ButtonBuilder()
      .setCustomId("setRegChannel")
      .setLabel("Reg channel")
      .setStyle(ButtonStyle.Secondary);

    const setModChannelButton = new ButtonBuilder()
      .setCustomId("setModChannel")
      .setLabel("Mod channel")
      .setStyle(ButtonStyle.Secondary);

    const setLogChannelButton = new ButtonBuilder()
      .setCustomId("setLogChannel")
      .setLabel("Log channel")
      .setStyle(ButtonStyle.Secondary);

    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([
          setRegChannelButton,
          setModChannelButton,
          setLogChannelButton,
        ]),
      ],
    });
  },
};
