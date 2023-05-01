import { Client } from "discord.js";
import Setting from "../../schemas/setting.js";

export default {
  data: {
    name: `regMenu`,
  },
  /**
   *
   * @param {import("discord.js").AnySelectMenuInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    // TODO: selected reg channel should be saved to database

    Setting.setValueByKey(
      interaction.guildId,
      "Channel:Registry",
      interaction.values[0]
    )
      .then(() => {
        client.logger.info(
          `Ayar: ${interaction.guild.name} için kayit kanalı ayarlandı -> ${interaction.values[0]}`
        );
      })
      .catch(client.logger.error);

    await interaction.reply({
      content: `Reg Menu ${interaction.values[0]} selected`,
    });
  },
};
