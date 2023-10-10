import { ActionRowBuilder, Colors, EmbedBuilder } from "discord.js";

import undoRole from "#components/buttons/undoRole";
import Setting from "#schemas/setting";

async function userRoleLog(client, guild, member, roles, codeId, type = "register") {
  await Setting.getValueByKey(guild.id, "Channel:Log").then(async (setting) => {
    if (!setting) {
      client.logger.error(`Ayarlar: Channel:Log ayarı bulunamadı.`);
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
      client.logger.error(`client.user is not defined.`);
      return;
    }

    const messageList = {
      register: {
        title: `${member.displayName} Kullanıcısı Kayıt Oldu.`,
        description: `${member} kullanıcısı ${codeId} kodu ile kayıt oldu.`,
        description2: "Kullanıcıya şu roller atandı:",
        color: Colors.Blue,
        removed: false,
      },
      "admin-add": {
        title: `${member.displayName} Kullanıcısına Rol Eklendi`,
        description: `${member} kullanıcısına ${codeId} kodu ile rol eklendi.`,
        description2: "Kullanıcıya şu roller eklendi:",
        color: Colors.Green,
        removed: false,
      },
      "admin-undo": {
        title: `${member.displayName} Kullanıcısına Eklenen Rol Geri Alındı`,
        description: `${member} kullanıcısına ${codeId} kodu ile eklenen rol geri alındı.`,
        description2: "Kullanıcıdan şu roller geri alındı:",
        color: Colors.Red,
        removed: true,
      },
      "admin-delete": {
        title: `${member.displayName} Kullanıcısına Eklenen Kod Silindi`,
        description: `${member} kullanıcısına eklenen ${codeId} kodu silindi.`,
        description2: "Kullanıcıdan şu roller silindi:",
        color: Colors.Red,
        removed: true,
      },
    };
    const message = messageList[type];

    // TODO: Log kanalına gönderilen embedler güncellencek
    const logEmbed = new EmbedBuilder()
      .setColor(message.color)
      .setThumbnail(member.displayAvatarURL())
      .addFields([
        {
          name: message.title,
          value: `${message.description}\n${message.description2}\n${roles
            .map((role) => `<@&${role.id}>`)
            .map((role) => {
              if (message.removed) {
                return `~~${role}~~`;
              }
              return role;
            })
            .join(", ")}`, // TODO: user role should be shown here
          inline: false,
        },
      ]);
    await channel.send({
      embeds: [logEmbed],
      components: message.removed
        ? []
        : [new ActionRowBuilder().addComponents([undoRole.generate(codeId)])],
    });
  });
}

export { userRoleLog };
