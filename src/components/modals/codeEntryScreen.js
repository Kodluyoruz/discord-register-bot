import Code from "../../schemas/code.js";
import { Colors, EmbedBuilder } from "discord.js";

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

    const codeEntry = await Code.getByCode(interaction.guildId, codeInput);

    if (codeEntry) {
      const role = interaction.guild.roles.cache.find(
        (r) => r.id === codeEntry.roleId
      );

      const member = await interaction.guild.members.fetch(interaction.user.id);

      await member.roles.add(role);
      await member.setNickname(nameInput);

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
            value: `@${role.name} rolü başarı ile tanımlandı. Bu rolde ......`, // TODO: user role should be shown here
            inline: false,
          },
        ]);
      await interaction.editReply({
        embeds: [embed],
      });
    } else {
      await interaction.editReply({
        content: `Kayıt kodunuz hatalı.`,
      });
    }
  },
};
