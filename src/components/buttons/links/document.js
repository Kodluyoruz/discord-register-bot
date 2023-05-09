import { ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: {
    name: "document",
  },
  generate() {
    return new ButtonBuilder()
      .setLabel("Dökümantasyon")
      .setURL("https://github.com/Kodluyoruz/discord-register-bot")
      .setStyle(ButtonStyle.Link);
  },
};
