const {
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  EmbedBuilder,
  Colors,
} = require("discord.js");

module.exports = {
  data: {
    name: "createCodesScreen",
  },
  
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client, roleId) {
    //const codeNumber = interaction.fields.getTextInputValue("codeNumberInput");
    // TODO: create random codes by code number input
    // TODO: check if code number input is valid (is it a number?)
    // TODO: convert string input to number
    // TODO: save codes to database with roleCode

    // await interaction.reply({
    //   content: `Oluştrulmak istenen kod sayısı: ${codeNumber}\nAtanacak rol:${roleId}`,
    // });

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
          name: `TEBRİKLER KODLAR OLUŞTURULDU`,
          value: `kodlar...`, // TODO: codes will be displayed
          inline: false,
        },
      ]);

    const downloadsCodesButton = new ButtonBuilder() // TODO: codes can be downloaded here
      .setCustomId("downloadCodes")
      .setLabel("Kodları İndir")
      .setStyle(ButtonStyle.Success);

    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([downloadsCodesButton]),
      ],
      embeds: [embed],
    });
  },
};
