// TODO: This will render buttons label and theri style depending on their status.
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

import setLogChannelButton from "#components/buttons/setLogChannel";
import setModChannelButton from "#components/buttons/setModChannel";
import setRegChannelButton from "#components/buttons/setRegChannel";

export default {
  data: {
    name: "setChannels",
  },
  generate() {
    return new ButtonBuilder()
      .setCustomId("setChannels")
      .setLabel("Kanal Ayarları")
      .setStyle(ButtonStyle.Secondary);
  },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    const channelSetEmbed = new EmbedBuilder()
      .setImage(client.thumbnailUrl)
      .setAuthor({
        url: client.documentUrl,
        iconURL: client.user.displayAvatarURL(),
        name: `Kodluyoruz Kayıt Botu`,
      })
      .setTitle("Kanal Ayarları")
      .setDescription("İşlemlerin yapılacağı kanalları seçiniz.");

    await interaction.editReply({
      embeds: [channelSetEmbed],
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
