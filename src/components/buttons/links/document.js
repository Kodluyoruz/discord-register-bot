import { ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: {
    name: "document",
  },
  generate(documentUrl) {
    return new ButtonBuilder()
      .setLabel("Dökümantasyon")
      .setURL(documentUrl)
      .setStyle(ButtonStyle.Link);
  },
};
