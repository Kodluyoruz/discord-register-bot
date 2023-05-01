import Code from "../../schemas/code.js";
import { Colors, EmbedBuilder } from "discord.js";

export default {
  data: {
    name: "codeEntryScreen",
  },
  async execute(interaction, client) {
    // TODO: CHECK IT FOR IS THIS REGISTRATION CODE IS CORRECT
    // TODO: Save to database with name and code (also with usertag)
    const codeInput = interaction.fields.getTextInputValue("codeInput");
    const nameInput = interaction.fields.getTextInputValue("nameInput");
    // let code = await client.db.get("code");

    const codeEntry = await Code.getByCode(interaction.guildId, codeInput);

    if (codeEntry) {
      const role = interaction.guild.roles.cache.find(
        (r) => r.id == codeEntry.roleId
      );
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

      await interaction.reply({
        embeds: [embed],
      });
    } else {
      await interaction.reply({
        content: `Kayıt kodunuz hatalı.`,
      });
    }
  },
};
