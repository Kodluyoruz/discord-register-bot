import { ActionRowBuilder } from "discord.js";

import setLogChannelButton from "#components/buttons/setLogChannel";
import setModChannelButton from "#components/buttons/setModChannel";
import setRegChannelButton from "#components/buttons/setRegChannel";
import registerButton from "#components/buttons/setRegisterationCode";
import registerEmbed from "#components/embeds/register";
import Setting from "#schemas/setting";

export default {
  data: {
    name: `regMenu`,
  },
  /**
   *
   * @param {import("discord.js").ChannelSelectMenuInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async execute(interaction, client) {
    if (interaction.inCachedGuild()) {
      await interaction.reply({
        content: "Bu komutu sadece sunucularda kullanabilirsiniz.",
        ephemeral: true,
      });
      return;
    }

    const inputChannel = await interaction.channels.first();
    if (!inputChannel) {
      interaction.editReply("Bir kanal seçmelisiniz.");
      return;
    }

    Setting.setValueByKey(interaction.guildId, "Channel:Registry", inputChannel.id)
      .then(() => {
        client.logger.info(
          `Ayar: ${interaction.guild.name} için kayit kanalı ayarlandı -> ${inputChannel.name}`
        );
      })
      .catch(client.logger.error);
    await interaction.deferReply({ ephemeral: true });

    await inputChannel.send({
      components: [new ActionRowBuilder().addComponents([registerButton.generate()])],
      embeds: [registerEmbed.generate(client.user?.displayAvatarURL())],
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
