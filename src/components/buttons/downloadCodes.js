import { ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: {
    name: "downloadCodes",
  },
  generate() {
    return new ButtonBuilder() // TODO: codes can be downloaded here
      .setCustomId("downloadCodes")
      .setLabel("Kodları İndir")
      .setStyle(ButtonStyle.Success);
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction) {
    await interaction.reply({
      content: `Kodlar indirildi!`,
    });
  },
};
