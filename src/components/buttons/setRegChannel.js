// TODO: If settings is not completed then it will render next select menu which is moderation channel
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelSelectMenuBuilder,
  ChannelType,
} from "discord.js";

export default {
  data: {
    name: "setRegChannel",
  },
  generate() {
    return new ButtonBuilder()
      .setCustomId("setRegChannel")
      .setLabel("Kayıt Kanalı Ayarla")
      .setStyle(ButtonStyle.Secondary);
  },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  async execute(interaction) {
    const select = new ChannelSelectMenuBuilder()
      .setCustomId("regMenu")
      .setPlaceholder("Kayıt kanalını seçin!")
      .setChannelTypes(ChannelType.GuildText);

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.deferUpdate();

    await interaction.editReply({
      content: "Kayıt kodunu girmek için kullanılacak kayıt odasını seçin.",
      components: [row],
      ephemeral: true,
    });
  },
};
