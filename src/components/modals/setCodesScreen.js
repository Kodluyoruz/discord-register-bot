import Code from "../../schemas/code.js";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
} from "discord.js";

export default {
  data: {
    name: "setCodesScreen",
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client, roleId) {
    //const codes = interaction.fields.getTextInputValue("codesInput");
    // TODO: split codes by commas
    // TODO: save codes into database with roleCode

    // await interaction.reply({
    //   content: `Oluştrulmak istenen kodlar: ${codes}\nAtanacak rol:${roleId}`,
    // });

    const codeInput = interaction.fields
      .getTextInputValue("codesInput")
      .split(",");

    const codes = await Code.addCode(interaction.guildId, roleId, codeInput);

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
          value: codeInput.join("/n"), // TODO: codes will be displayed
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
