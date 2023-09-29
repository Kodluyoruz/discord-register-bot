import Setting from "#schemas/setting";

export default {
  name: "ready",
  once: true,
  /**
   *
   * @param {import("discord.js").Client} client
   */
  async execute(client) {
    const { logger } = client;
    logger.info(`Client: ${client.user.tag} (${client.user.id}) ismi ile giriş yapıldı.`);

    client.guilds.cache
      .map((g) => g)
      .forEach((guild) => {
        try {
          logger.info(`Komut: ${guild.name} sunucusuna tanımlanıyor`);
          guild.commands
            .set(client.commandArray)
            .then((slashCommandsData) => {
              client.slashCommandsData = slashCommandsData;
              logger.info(
                `Komut: ${guild.name} sunucusuna tanımlanan komut sayısı ${
                  slashCommandsData.size
                } (${slashCommandsData.map((d) => d.options).flat().length} alt komut)`
              );
            })
            .catch(logger.error);
        } catch (e) {
          logger.error(e);
        }
      });

    client.guilds.cache
      .map((g) => g)
      .forEach((guild) => {
        try {
          Setting.getValueByKey(guild.id, "Channel:Log")
            .then(async (setting) => {
              if (setting) {
                const channel = guild.channels.cache.find((c) => c.id === setting.value);
                logger.info(`Ayarlar: ${guild.name} için işlem kaydı kanalı -> ${channel.name}`);
              } else {
                logger.warn(`Ayarlar: ${guild.name} için işlem kaydı kanalı ayarlanmamış`);
              }
            })
            .catch(logger.error);

          Setting.getValueByKey(guild.id, "Channel:Registry")
            .then(async (setting) => {
              if (setting) {
                const channel = guild.channels.cache.find((c) => c.id === setting.value);
                logger.info(`Ayarlar: ${guild.name} için kayıt kanalı -> ${channel.name}`);
              } else {
                logger.warn(`Ayarlar: ${guild.name} için kayıt kanalı ayarlanmamış`);
              }
            })
            .catch(logger.error);

          Setting.getValueByKey(guild.id, "Channel:Moderation")
            .then(async (setting) => {
              if (setting) {
                const channel = guild.channels.cache.find((c) => c.id === setting.value);
                logger.info(`Ayarlar: ${guild.name} için moderasyon kanalı -> ${channel.name}`);
              } else {
                logger.warn(`Ayarlar: ${guild.name} için moderasyon kanalı ayarlanmamış`);
              }
            })
            .catch(logger.error);
        } catch (e) {
          logger.error(e);
        }
      });
  },
};
