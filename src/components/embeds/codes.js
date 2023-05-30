import { Colors, EmbedBuilder } from "discord.js";

export default {
  data: {
    name: `codes`,
  },
  async generate(client, updatedCodes, newCodes, updatedUsers) {
    // Discord embed'i oluşturulur
    const embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setImage(client.user.displayAvatarURL()) // TODO: Resim figmadaki resimle değiştirilecek
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({
        url: "https://github.com/Kodluyoruz/discord-register-bot",
        iconURL: client.user.displayAvatarURL(),
        name: `Kodluyoruz Kayıt Botu`,
      })
      .setTitle("Guild Code Güncellendi!")
      .setDescription(
        `**${newCodes.length}** yeni kod eklendi, **${updatedCodes.length}** kod güncellendi, **${updatedUsers.length}** kullanıcı güncellendi.`
      );

    // Güncellenen ve yeni eklenen kodlar embed içinde ayrı ayrı listelenir
    if (newCodes.length > 0) {
      const newCodesString = newCodes
        .map(
          (code) =>
            `\`${code.codeId}\` (${code.addedRoleIds
              .map((roleId) => `<@&${roleId}>`)
              .join(", ")})`
        )
        .join("\n");
      embed.addFields({ name: "Yeni Kodlar", value: newCodesString });
    }
    if (updatedCodes.length > 0) {
      const updatedCodesString = updatedCodes
        .map(
          (code) =>
            `\`${code.codeId}\` (:ballot_box_with_check: ${code.addedRoleIds
              .map((roleId) => `<@&${roleId}>`)
              .join(", ")}, :no_entry_sign:: ${code.removedRoleIds
              .map((roleId) => `<@&${roleId}>`)
              .join(", ")}, :warning: ${code.notUpdatedRoleIds
              .map((roleId) => `<@&${roleId}>`)
              .join(", ")})`
        )
        .join("\n");
      embed.addFields({
        name: "Güncellenen Kodlar",
        value: updatedCodesString,
      });
    }

    // Kullanıcı güncellemeleri ile ilgili bir mesaj gösterilir
    if (updatedUsers.length > 0) {
      const updatedUsersString = updatedUsers
        .map(
          (code) =>
            `\`${code.codeId}\` <@${
              code.userId
            }> (:ballot_box_with_check: ${code.addedRoleIds
              .map((roleId) => `<@&${roleId}>`)
              .join(", ")}, :no_entry_sign:: ${code.removedRoleIds
              .map((roleId) => `<@&${roleId}>`)
              .join(", ")}, :warning: ${code.notUpdatedRoleIds
              .map((roleId) => `<@&${roleId}>`)
              .join(", ")})`
        )
        .join("\n");
      embed.addFields({
        name: "Güncellenen Kullanıcılar",
        value: updatedUsersString,
      });

      // Kullanıcıdan gerekli kodları almak ve eklemek için gerekli kodları burada yazabilirsiniz.
    }

    return embed;
  },
};
