import { Colors, EmbedBuilder } from "discord.js";

const MAX_ITEMS_TO_DISPLAY = 10;

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
        parts.push(`:ballot_box_with_check: ${mapRoleIdsToMentions(addedRoleIds)}`);
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
          name,
          value: data.map(generateGuildCodeString).join("\n"),
        });
      }
    }

    const embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setImage(client.thumbnailUrl) // TODO: Resim figmadaki resimle değiştirilecek
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({
        name: "Kodluyoruz Kayıt Botu",
        iconURL: client.user.displayAvatarURL(),
        url: "https://github.com/Kodluyoruz/discord-register-bot",
      })
      .setTitle("Guild Code Güncellendi!")
      .setDescription(
        `**${newGuildCodes?.length}** yeni kod eklendi, **${updatedGuildCodes?.length}** kod güncellendi, **${updatedGuildUsers?.length}** kullanıcı güncellendi.`
      );

    addFieldIfNotEmpty(
      embed,
      `Yeni Kodlar (${Math.min(MAX_ITEMS_TO_DISPLAY, newGuildCodes.length)}/${
        newGuildCodes.length
      })`,
      Array.from(newGuildCodes).slice(0, MAX_ITEMS_TO_DISPLAY)
    );
    addFieldIfNotEmpty(
      embed,
      `Güncellenen Kodlar (${Math.min(MAX_ITEMS_TO_DISPLAY, updatedGuildCodes.length)}/${
        updatedGuildCodes.length
      })`,
      Array.from(updatedGuildCodes).slice(0, MAX_ITEMS_TO_DISPLAY)
    );
    addFieldIfNotEmpty(
      embed,
      `Güncellenen Kullanıcılar (${Math.min(MAX_ITEMS_TO_DISPLAY, updatedGuildUsers.length)}/${
        updatedGuildUsers.length
      })`,
      Array.from(updatedGuildUsers).slice(0, MAX_ITEMS_TO_DISPLAY)
    );

    return embed;
  },
};
