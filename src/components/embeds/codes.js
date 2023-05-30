import { Colors, EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "codes",
  },
  async generate(client, updatedGuildCodes, newGuildCodes, updatedGuildUsers) {
    function mapRoleIdsToMentions(roleIds) {
      return roleIds.map((roleId) => `<@&${roleId}>`).join(", ");
    }

    function generateGuildCodeString({
      codeId,
      userId = "",
      addedRoleIds = [],
      removedRoleIds = [],
      notUpdatedRoleIds = [],
    }) {
      const parts = [`\`${codeId}\``];

      if (userId) {
        parts.push(`<@${userId}>`);
      }

      if (addedRoleIds.length > 0) {
        parts.push(
          `:ballot_box_with_check: ${mapRoleIdsToMentions(addedRoleIds)}`
        );
      }

      if (removedRoleIds.length > 0) {
        parts.push(`:no_entry_sign: ${mapRoleIdsToMentions(removedRoleIds)}`);
      }

      if (notUpdatedRoleIds.length > 0) {
        parts.push(`:warning: ${mapRoleIdsToMentions(notUpdatedRoleIds)}`);
      }

      return parts.join(" ");
    }

    function addFieldIfNotEmpty(embed, name, data) {
      if (data.length > 0) {
        embed.addFields({
          name: name,
          value: data.map(generateGuildCodeString).join("\n"),
        });
      }
    }

    const embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setImage(client.user.displayAvatarURL()) // TODO: Resim figmadaki resimle değiştirilecek
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({
        name: "Kodluyoruz Kayıt Botu",
        iconURL: client.user.displayAvatarURL(),
        url: "https://github.com/Kodluyoruz/discord-register-bot",
        iconURL: client.user.displayAvatarURL(),
        name: `Kodluyoruz Kayıt Botu`,
      })
      .setTitle("Guild Code Güncellendi!")
      .setDescription(
        `**${newGuildCodes.length}** yeni kod eklendi, **${updatedGuildCodes.length}** kod güncellendi, **${updatedGuildUsers.length}** kullanıcı güncellendi.`
      );

    addFieldIfNotEmpty(embed, "Yeni Kodlar", newGuildCodes);
    addFieldIfNotEmpty(embed, "Güncellenen Kodlar", updatedGuildCodes);
    addFieldIfNotEmpty(embed, "Güncellenen Kullanıcılar", updatedGuildUsers);

    return embed;
  },
};
