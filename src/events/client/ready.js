import { ActionRowBuilder } from "discord.js";

import Setting from "../../schemas/setting.js";

export default {
  name: "ready",
  once: true,
  /**
   *
   * @param {import("discord.js").Client} client
   */
  async execute(client) {
    const { logger } = client;
    logger.info(
      `Client: ${client.user.tag} (${client.user.id}) ismi ile giriş yapıldı.`
    );

    for (const guild of client.guilds.cache.map((g) => g)) {
      try {
        //await guild.commands.set([]).catch(() => { });
        logger.info(`Komut: ${guild.name} sunucusuna tanımlanıyor`);
        guild.commands
          .set(client.commandArray)
          .then((slashCommandsData) => {
            client.slashCommandsData = slashCommandsData;
            logger.info(
              `Komut: ${guild.name} sunucusuna tanımlanan komut sayısı ${
                slashCommandsData.size
              } (${
                slashCommandsData.map((d) => d.options).flat().length
              } alt komut)`
            );
          })
          .catch(logger.error);
      } catch (e) {
        logger.error(e);
      }
    }

    for (const guild of client.guilds.cache.map((g) => g)) {
      try {
        Setting.getValueByKey(guild.id, "Channel:Log").then(async (setting) => {
          if (setting) {
            const channel = guild.channels.cache.find(
              (channel) => channel.id === setting.value
            );
            client.logger.info(
              `Ayarlar: ${guild.name} için işlem kaydı kanalı -> ${channel.name}`
            );
          } else {
            client.logger.info(
              `Ayarlar: ${guild.name} için işlem kaydı kanalı ayarlanmamış`
            );
          }
        });

        Setting.getValueByKey(guild.id, "Channel:Registry").then(
          async (setting) => {
            if (setting) {
              const channel = guild.channels.cache.find(
                (channel) => channel.id === setting.value
              );
              client.logger.info(
                `Ayarlar: ${guild.name} için kayıt kanalı -> ${channel.name}`
              );
            } else {
              client.logger.info(
                `Ayarlar: ${guild.name} için kayıt kanalı ayarlanmamış`
              );
            }
          }
        );

        Setting.getValueByKey(guild.id, "Channel:Moderation").then(
          async (setting) => {
            if (setting) {
              const channel = guild.channels.cache.find(
                (channel) => channel.id === setting.value
              );
              client.logger.info(
                `Ayarlar: ${guild.name} için moderasyon kanalı -> ${channel.name}`
              );
            } else {
              client.logger.info(
                `Ayarlar: ${guild.name} için moderasyon kanalı ayarlanmamış`
              );
            }
          }
        );
      } catch (e) {
        logger.error(e);
      }
    }

    client.user.setPresence({
      activities: [
        {
          name: "Kodluyoruz Kayıt Botu | Link: https://github.com/Kodluyoruz/discord-register-bot/",
        },
      ],
    });
  },
};
