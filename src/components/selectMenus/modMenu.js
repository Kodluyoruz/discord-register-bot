import Setting from "../../schemas/setting.js";

export default {
  data: {
    name: `modMenu`,
  },
  async execute(interaction, client) {
    // TODO: selected mod channel should be saved to database

    Setting.setValueByKey(
      interaction.guildId,
      "Channel:Moderation",
      interaction.values[0]
    )
      .then(() => {
        client.logger.info(
          `Ayar: ${interaction.guild.name} için moderasyon kanalı ayarlandı -> ${interaction.values[0]}`
        );
      })
      .catch(client.logger.error);

    await interaction.reply({
      content: `Mod Menu ${interaction.values[0]} selected`,
    });
  },
};
