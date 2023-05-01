import Code from "../../schemas/code.js";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  ModalSubmitInteraction,
} from "discord.js";

export default {
  data: {
    name: "createCodesScreen",
  },

  // eslint-disable-next-line no-unused-vars
  /**
   *
   * @param {ModalSubmitInteraction} interaction
   * @param {Client} client
   * @param {String} roleId
   */
  async execute(interaction, client, roleId) {
    //const codeNumber = interaction.fields.getTextInputValue("codeNumberInput");
    // TODO: create random codes by code number input
    // TODO: check if code number input is valid (is it a number?)
    // TODO: convert string input to number
    // TODO: save codes to database with roleCode

    // await interaction.reply({
    //   content: `Oluştrulmak istenen kod sayısı: ${codeNumber}\nAtanacak rol:${roleId}`,
    // });

    const codeCount = parseInt(
      interaction.fields.getTextInputValue("codeNumberInput")
    );

    const generateRandomCode = ["123", "345", "777", "111", "666"];

    const codes = await Code.addCode(
      interaction.guildId,
      roleId,
      generateRandomCode
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
          name: `TEBRİKLER KODLAR OLUŞTURULDU`,
          value: generateRandomCode.join("/n"), // TODO: codes will be displayed
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
