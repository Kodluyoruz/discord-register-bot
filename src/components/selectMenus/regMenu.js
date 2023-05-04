import {
  ActionRowBuilder,
  ChannelSelectMenuInteraction,
  Client,
} from "discord.js";
import Setting from "../../schemas/setting.js";
import setRegChannelButton from "../buttons/setRegChannel.js";
import setModChannelButton from "../buttons/setModChannel.js";
import setLogChannelButton from "../buttons/setLogChannel.js";
import registerButton from "../buttons/setRegisterationCode.js";
import registerEmbed from "../embeds/register.js";

export default {
  data: {
    name: `regMenu`,
  },
  /**
   *
   * @param {ChannelSelectMenuInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const inputChannel = await interaction.channels.first();

    Setting.setValueByKey(
      interaction.guildId,
      "Channel:Registry",
      inputChannel.id
    )
      .then(() => {
        client.logger.info(
          `Ayar: ${interaction.guild.name} için kayit kanalı ayarlandı -> ${inputChannel.name}`
        );
      })
      .catch(client.logger.error);
    await interaction.deferUpdate({ ephemeral: true });

    await inputChannel.send({
      components: [
        new ActionRowBuilder().addComponents([registerButton.generate()]),
      ],
      embeds: [registerEmbed.generate(client)],
    });

    await interaction.editReply({
      content: `Kayıt kanalı ${inputChannel.name} seçildi.`,
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
