import { Colors, EmbedBuilder } from "discord.js";

import Code from "#schemas/code";
import Setting from "#schemas/setting";

export default {
  data: {
    name: "codeEntryScreen",
  },
  /**
   *
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   * @param {import("discord.js").Client} client
   */
  async execute(interaction, client) {
    if (!client.user) {
      return;
    }

    if (!interaction.inCachedGuild()) {
      interaction.reply({
        content: "Bu komut sadece sunucularda kullanılabilir",
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    const codeInput = interaction.fields.getTextInputValue("codeInput");
    const nameInput = interaction.fields.getTextInputValue("nameInput");

    const codeEntry = await Code.getByCodeId(interaction.guildId, codeInput);

    if (codeEntry && !codeEntry.userId) {
      /** {Array<Role>} */
      const roles = [];
      codeEntry.roleIds.forEach((roleId) => {
        const role = interaction.guild.roles.cache.get(roleId);
        if (role) {
          roles.push(role);
        }
      });

      const member =
        interaction.guild.members.cache.get(interaction.user.id) ||
        (await interaction.guild.members.fetch(interaction.user.id));

      await Code.updateCodeUserId(interaction.guildId, codeInput, interaction.user.id);

      // TODO: check permision

      await member.roles.add(roles).catch(client.logger.error);
      await member.setNickname(nameInput).catch(client.logger.error);

      const embed = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setImage(client.thumbnailUrl) // TODO: Resim figmadaki resimle değiştirilecek
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor({
          url: "https://github.com/Kodluyoruz/discord-register-bot",
          iconURL: client.user.displayAvatarURL(),
          name: `Kodluyoruz Kayıt Botu`,
        })
        .setURL("https://github.com/Kodluyoruz/discord-register-bot")
        .addFields([
          {
            name: `TEBRİKLER ${nameInput}`,
            value: `${roles
              .map((role) => `<@&${role.id}>`)
              .join(", ")} rolleri başarı ile tanımlandı. Bu rolde ......`, // TODO: user role should be shown here
            inline: false,
          },
        ]);
      await interaction.editReply({
        embeds: [embed],
      });

      const { guild } = interaction;

      Setting.getValueByKey(guild.id, "Channel:Log").then(async (setting) => {
        if (!setting) {
          return;
        }
        const channel = guild.channels.cache.find((c) => c.id === setting.value);

        if (!channel) {
          client.logger.error(
            `Ayarlar: Channel:Log ayarı olan ${setting.value} kanalı bulunamadı.`
          );
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
          .setImage(client.thumbnailUrl) // TODO: Resim figmadaki resimle değiştirilecek
          .setThumbnail(client.user.displayAvatarURL())
          .setAuthor({
            url: "https://github.com/Kodluyoruz/discord-register-bot",
            iconURL: client.user.displayAvatarURL(),
            name: `Kodluyoruz Kayıt Botu`,
          })
          .setURL("https://github.com/Kodluyoruz/discord-register-bot")
          .addFields([
            {
              name: `Güncellenen Rol ${nameInput}`,
              value: `${roles
                .map((role) => `<@&${role.id}>`)
                .join(", ")} rolleri başarı ile tanımlandı. Bu rolde ......`, // TODO: user role should be shown here
              inline: false,
            },
          ]);
        await channel.send({
          embeds: [logEmbed],
        });
      });
      return;
    }
    if (codeEntry?.userId) {
      await interaction.editReply({
        content: `Bu kod kullanılmış.`,
      });
    } else {
      await interaction.editReply({
        content: `Kayıt kodunuz hatalı.`,
      });
    }
  },
};
