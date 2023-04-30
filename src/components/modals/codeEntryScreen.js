const {
  EmbedBuilder,
  Colors,
} = require("discord.js");

module.exports = {
  data: {
    name: "codeEntryScreen",
  },
  async execute(interaction, client) {
    // TODO: CHECK IT FOR IS THIS REGISTRATION CODE IS CORRECT
    const codeInput = interaction.fields.getTextInputValue("codeInput");
    // let code = await client.db.get("code");
    const code = "123";

    if (codeInput == code) {
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
            name: `TEBRİKLER`,
            value: `@rol-adi rol başarı ile tanımlandı. Bu rolde ......`, // TODO: user role should be shown here
            inline: false,
          },
        ]);

      await interaction.reply({
        embeds: [embed],
      });
      return;
    } else {
      await interaction.reply({
        content: `Kayıt kodunuz hatalı.`,
      });
      return;
    }
  },
};
