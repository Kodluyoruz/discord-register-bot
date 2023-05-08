import { ActionRowBuilder } from "discord.js";
import Setting from "../../schemas/setting.js";
import setRegChannelButton from "../buttons/setRegChannel.js";
import setModChannelButton from "../buttons/setModChannel.js";
import setLogChannelButton from "../buttons/setLogChannel.js";
import documentButton from "../buttons/links/document.js";
import setRoleButton from "../buttons/setRole.js";
import setChannelsButton from "../buttons/setChannels.js";
import setupEmbed from "../embeds/settings.js";

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
    Setting.setValueByKey(
      interaction.guildId,
      "Channel:Moderation",
      inputChannel.id
    )
      .then(() => {
        client.logger.info(
          `Ayar: ${interaction.guild.name} için moderasyon kanalı ayarlandı -> ${inputChannel.name}`
        );
      })
      .catch(client.logger.error);
    await interaction.deferUpdate({ ephemeral: true });

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
