import {
  ActionRowBuilder,
  ButtonBuilder,
  ChannelSelectMenuBuilder,
  ChannelType,
  ButtonStyle,
  StringSelectMenuOptionBuilder,
} from "discord.js";

export default {
  data: {
    name: "setLogChannel",
  },
  generate() {
    return new ButtonBuilder()
      .setCustomId("setLogChannel")
      .setLabel("Log Kanalı Ayarla")
      .setStyle(ButtonStyle.Secondary);
  },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  async execute(interaction) {
    const select = new ChannelSelectMenuBuilder()
      .setCustomId("logMenu")
      .setPlaceholder("Log kanalını seçin!")
      .setChannelTypes(ChannelType.GuildText);

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.deferUpdate({ ephemeral: true });
    await interaction.editReply({
      content: "Logların düşeceği odayı seçin.",
      components: [row],
      ephemeral: true,
    });
  },
};
