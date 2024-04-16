import { Colors, EmbedBuilder } from "discord.js";

const MAX_ITEMS_TO_DISPLAY = 5;

export default {
  data: {
    name: "codes",
  },
  async generate(
    client,
    updatedGuildCodes,
    newGuildCodes,
    updatedGuildUsers,
    removedGuildCodes = []
  ) {
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
    // add description if not empty
    let description = [];
    if (newGuildCodes.length > 0) {
      description.push(`**${newGuildCodes.length}** kod`);
    }
    if (updatedGuildCodes.length > 0) {
      description.push(`**${updatedGuildCodes.length}** güncellenen kod`);
    }
    if (removedGuildCodes.length > 0) {
      description.push(`**${removedGuildCodes.length}** silinen kod`);
    }
    if (updatedGuildUsers.length > 0) {
      description.push(`**${updatedGuildUsers.length}** kullanıcı`);
    }
    if (description.length > 0) {
      description = description.join(", ").concat(".");
    } else {
      description = "Tanımlı kod bulunamadı.";
    }

    const embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setImage(client.thumbnailUrl) // TODO: Resim figmadaki resimle değiştirilecek
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({
        name: "Kodluyoruz Kayıt Botu",
        iconURL: client.user.displayAvatarURL(),
        url: client.documentUrl,
      })
      .setTitle("Kod Listesi!")
      .setDescription(description);

    addFieldIfNotEmpty(
      embed,
      `Kodlar (${Math.min(MAX_ITEMS_TO_DISPLAY, newGuildCodes.length)}/${newGuildCodes.length})`,
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
      `Silinen Kodlar (${Math.min(MAX_ITEMS_TO_DISPLAY, removedGuildCodes.length)}/${
        removedGuildCodes.length
      })`,
      Array.from(removedGuildCodes).slice(0, MAX_ITEMS_TO_DISPLAY)
    );
    addFieldIfNotEmpty(
      embed,
      `Kullanıcılar (${Math.min(MAX_ITEMS_TO_DISPLAY, updatedGuildUsers.length)}/${
        updatedGuildUsers.length
      })`,
      Array.from(updatedGuildUsers).slice(0, MAX_ITEMS_TO_DISPLAY)
    );

    return embed;
  },
};
