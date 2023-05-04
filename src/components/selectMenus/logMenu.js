import {
  ActionRowBuilder,
  ChannelSelectMenuInteraction,
  Client,
} from "discord.js";
import Setting from "../../schemas/setting.js";
import setRegChannelButton from "../buttons/setRegChannel.js";
import setModChannelButton from "../buttons/setModChannel.js";
import setLogChannelButton from "../buttons/setLogChannel.js";

export default {
  data: {
    name: `logMenu`,
  },
  /**
   *
   * @param {ChannelSelectMenuInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const inputChannel = interaction.channels.first();

    Setting.setValueByKey(interaction.guildId, "Channel:Log", inputChannel.id)
      .then(() => {
        client.logger.info(
          `Ayar: ${interaction.guild.name} için işlem kaydı kanalı ayarlandı -> ${inputChannel.name}`
        );
      })
      .catch(client.logger.error);
    await interaction.deferUpdate({ ephemeral: true });

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
