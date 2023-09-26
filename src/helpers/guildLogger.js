import { Colors, EmbedBuilder } from "discord.js";

import Setting from "#schemas/setting";

async function userRoleLog(client, guild, userAvatar, name, roles) {
  Setting.getValueByKey(guild.id, "Channel:Log").then(async (setting) => {
    if (!setting) {
      return;
    }
    const channel = guild.channels.cache.find((c) => c.id === setting.value);

    if (!channel) {
      client.logger.error(`Ayarlar: Channel:Log ayarı olan ${setting.value} kanalı bulunamadı.`);
      return;
    }
    if (!channel.isTextBased()) {
      client.logger.error(
        `Ayarlar: Channel:Log ayarı olan ${setting.value} kanalı metin kanalı değil.`
      );
      return;
    }

    if (!client.user) {
      return;
    }

    // TODO: Log kanalına gönderilen embedler güncellencek
    const logEmbed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setThumbnail(userAvatar)
      .addFields([
        {
          name: `${name} Kullanıcısı Kayıt Oldu`,
          value: `${roles.map((role) => `<@&${role.id}>`).join(", ")} rolleri kullanıcıya atandı`, // TODO: user role should be shown here
          inline: false,
        },
      ]);
    await channel.send({
      embeds: [logEmbed],
    });
  });
}

export { userRoleLog };
