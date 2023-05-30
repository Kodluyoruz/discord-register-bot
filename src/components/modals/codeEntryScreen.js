import Code from "../../schemas/code.js";
import { Colors, EmbedBuilder } from "discord.js";
import Setting from "../../schemas/setting.js";

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
    await interaction.deferReply({ ephemeral: true });

    const codeInput = interaction.fields.getTextInputValue("codeInput");
    const nameInput = interaction.fields.getTextInputValue("nameInput");

    const codeEntry = await Code.getByCodeId(interaction.guildId, codeInput);

    if (codeEntry && !codeEntry.userId) {
      const roles = codeEntry.roleIds.map((roleId) =>
        interaction.guild.roles.cache.get(roleId)
      );

      const member = interaction.guild.members.cache.get(interaction.user.id) || await interaction.guild.members.fetch(interaction.user.id);

      await Code.updateCodeUserId(
        interaction.guildId,
        codeInput,
        interaction.user.id
      );

      // TODO: check permision

      await member.roles.add(roles).catch(() => {});
      await member.setNickname(nameInput).catch(() => {});

      const embed = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setImage(client.user.displayAvatarURL()) // TODO: Resim figmadaki resimle değiştirilecek
        .setThumbnail(interaction.user.displayAvatarURL())
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
        if (setting) {
          const channel = guild.channels.cache.find(
            (channel) => channel.id === setting.value
          );

          // TODO: Log kanalına gönderilen embedler güncellencek
          const logEmbed = new EmbedBuilder()
            .setColor(Colors.Blue)
            .setImage(client.user.displayAvatarURL()) // TODO: Resim figmadaki resimle değiştirilecek
            .setThumbnail(interaction.user.displayAvatarURL())
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
        }
      });
    } else if (codeEntry && codeEntry.userId) {
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
