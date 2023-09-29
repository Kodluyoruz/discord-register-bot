// TODO: If settings is not completed then it will render next select menu which is log channel
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelSelectMenuBuilder,
  ChannelType,
} from "discord.js";

export default {
  data: {
    name: "setModChannel",
  },
  generate() {
    return new ButtonBuilder()
      .setCustomId("setModChannel")
      .setLabel("Moderasyon Kanalı Ayarla")
      .setStyle(ButtonStyle.Secondary);
  },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  async execute(interaction) {
    const select = new ChannelSelectMenuBuilder()
      .setCustomId("modMenu")
      .setPlaceholder("Moderasyon kanalını seçin!")
      .setChannelTypes(ChannelType.GuildText);

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.deferUpdate();
    await interaction.editReply({
      content: "Moderasyonun yapılacağı odayı seçin.",
      components: [row],
      ephemeral: true,
    });
  },
};
