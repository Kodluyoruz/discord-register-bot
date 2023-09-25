import { ActionRowBuilder } from "discord.js";

import setLogChannelButton from "#components/buttons/setLogChannel";
import setModChannelButton from "#components/buttons/setModChannel";
import setRegChannelButton from "#components/buttons/setRegChannel";
import Setting from "#schemas/setting";

export default {
  data: {
    name: `logMenu`,
  },
  /**
   *
   * @param {import("discord.js").ChannelSelectMenuInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async execute(interaction, client) {
    const inputChannel = interaction.channels.first();

    if (!interaction.inCachedGuild()) {
      interaction.reply({
        content: "Bu komut sadece sunucularda kullanılabilir",
        ephemeral: true,
      });
      return;
    }

    Setting.setValueByKey(interaction.guildId, "Channel:Log", inputChannel.id)
      .then(() => {
        client.logger.info(
          `Ayar: ${interaction.guild.name} için işlem kaydı kanalı ayarlandı -> ${inputChannel.name}`
        );
      })
      .catch(client.logger.error);
    await interaction.deferReply({ ephemeral: true });

    await interaction.editReply({
      content: `İşlem kayıtları için ${inputChannel.name} seçildi.`,
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
