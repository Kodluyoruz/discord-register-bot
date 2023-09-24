import { ActionRowBuilder } from "discord.js";

import documentButton from "#components/buttons/links/document";
import setChannelsButton from "#components/buttons/setChannels";
import setLogChannelButton from "#components/buttons/setLogChannel";
import setModChannelButton from "#components/buttons/setModChannel";
import setRegChannelButton from "#components/buttons/setRegChannel";
import setRoleButton from "#components/buttons/setRole";
import setupEmbed from "#components/embeds/settings";
import Setting from "#schemas/setting";

export default {
  data: {
    name: `modMenu`,
  },
  /**
   *
   * @param {import("discord.js").ChannelSelectMenuInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async execute(interaction, client) {
    const inputChannel = await interaction.channels.first();
    if (interaction.inCachedGuild()) {
      await interaction.reply({
        content: "Bu komutu sadece sunucularda kullanabilirsiniz.",
        ephemeral: true,
      });
      return;
    }

    if (!inputChannel) {
      interaction.editReply("Bir kanal seçmelisiniz.");
      return;
    }

    Setting.setValueByKey(interaction.guildId, "Channel:Moderation", inputChannel.id)
      .then(() => {
        client.logger.info(
          `Ayar: ${interaction.guild.name} için moderasyon kanalı ayarlandı -> ${inputChannel.name}`
        );
      })
      .catch(client.logger.error);
    await interaction.deferReply({ ephemeral: true });

    await inputChannel.send({
      components: [
        new ActionRowBuilder().addComponents([
          documentButton.generate(),
          setRoleButton.generate(),
          setChannelsButton.generate(),
        ]),
      ],
      embeds: [setupEmbed.generate(client)],
    });

    await interaction.editReply({
      content: `Moderasyon kanalı ${inputChannel.name} seçildi.`,
      ephemeral: true,
      components: [
        new ActionRowBuilder().addComponents([
          setRegChannelButton.generate(),
          setModChannelButton.generate(),
          setLogChannelButton.generate(),
        ]),
      ],
    });
  },
};
