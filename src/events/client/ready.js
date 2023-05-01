import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  Client,
  Colors,
  EmbedBuilder,
} from "discord.js";

import Setting from "../../schemas/setting.js";
export default {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    const { logger } = client;
    logger.info(
      `Client: ${client.user.tag} (${client.user.id}) ismi ile giriş yapıldı.`
    );

    client.guilds.cache
      .map((g) => g)
      .forEach(async (guild) => {
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
      });

    client.guilds.cache
      .map((g) => g)
      .forEach(async (guild) => {
        try {
          Setting.getValueByKey(guild.id, "Channel:Registry").then(
            async (setting) => {
              if (setting) {
                const embed = new EmbedBuilder()
                  .setColor(Colors.Blue)
                  .setImage(client.user.displayAvatarURL()) // TODO: Resim figmadaki resimle değiştirilecek
                  .setThumbnail(client.user.displayAvatarURL())
                  .setAuthor({
                    url: "https://github.com/Kodluyoruz/discord-register-bot",
                    iconURL: client.user.displayAvatarURL(),
                    name: `Kodluyoruz Kayıt Botu`,
                  })
                  .setURL("https://github.com/Kodluyoruz/discord-register-bot")
                  .addFields([
                    {
                      name: `Kayıt Ol`,
                      value: `Kayıt işlemini tamamlamak için kayıdı gerçekleştir butonuna tıkladıktan sonra size verilen kodu açılacak olan pencereye giriniz.`,
                      inline: false,
                    },
                  ]);

                const registerButton = new ButtonBuilder()
                  .setCustomId("setRegisterationCode")
                  .setLabel("Kaydı Gerçekleştir")
                  .setStyle(ButtonStyle.Success);

                const channel = guild.channels.cache.find(
                  (channel) => channel.id == setting.value
                );

                await channel.send({
                  components: [
                    new ActionRowBuilder().addComponents([registerButton]),
                  ],
                  embeds: [embed],
                });
              }
            }
          );

          Setting.getValueByKey(guild.id, "Channel:Moderation").then(
            async (setting) => {
              if (setting) {
                const embed = new EmbedBuilder()
                  .setColor(Colors.Blue)
                  .setImage(client.user.displayAvatarURL()) // TODO: Resim figmadaki resimle değiştirilecek
                  .setThumbnail(client.user.displayAvatarURL())
                  .setAuthor({
                    url: "https://github.com/Kodluyoruz/discord-register-bot",
                    iconURL: client.user.displayAvatarURL(),
                    name: `Kodluyoruz Kayıt Botu`,
                  })
                  .setURL("https://github.com/Kodluyoruz/discord-register-bot")
                  .addFields([
                    {
                      name: `Kodluyoruz Kayıt Botu Yardım Menüsüne`,
                      value: `Aşağıdaki butonları kullanarak kuruluma başlamdan önce dökümanı okuyabilir ve kuruluma başlayabilirsiniz.`,
                      inline: false,
                    },
                  ]);

                const docsButton = new ButtonBuilder()
                  .setLabel("Dökümantasyon")
                  .setURL("https://github.com/Kodluyoruz/discord-register-bot")
                  .setStyle(ButtonStyle.Link);

                const setRoleButton = new ButtonBuilder()
                  .setCustomId("setRole")
                  .setLabel("Kuruluma Başla")
                  .setStyle(ButtonStyle.Success);

                const setChannelesButton = new ButtonBuilder()
                  .setCustomId("setChannels")
                  .setLabel("Ayarları Düzenle")
                  .setStyle(ButtonStyle.Secondary);

                const channel = guild.channels.cache.find(
                  (channel) => channel.id == setting.value
                );

                await channel.send({
                  components: [
                    new ActionRowBuilder().addComponents([
                      docsButton,
                      setRoleButton,
                      setChannelesButton,
                    ]),
                  ],
                  embeds: [embed],
                });
              }
            }
          );
        } catch (e) {
          logger.error(e);
        }
      });

    client.user.setPresence({
      activities: [
        {
          name: "Kodluyoruz Kayıt Botu | Link: https://github.com/Kodluyoruz/discord-register-bot/",
        },
      ],
    });
  },
};
