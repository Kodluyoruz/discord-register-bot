import Setting from "../../schemas/setting.js";

export default {
  data: {
    name: `logMenu`,
  },
  async execute(interaction, client) {
    // TODO: selected log channel should be saved to database

    Setting.setValueByKey(
      interaction.guildId,
      "Channel:Log",
      interaction.values[0]
    )
      .then(() => {
        client.logger.info(
          `Ayar: ${interaction.guild.name} için işlem kaydı kanalı ayarlandı -> ${interaction.values[0]}`
        );
      })
      .catch(client.logger.error);

    await interaction.reply({
      content: `Log Menu ${interaction.values[0]} selected`,
    });
  },
};
