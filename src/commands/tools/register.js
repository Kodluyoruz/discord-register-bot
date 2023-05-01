import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kayıtol")
    .setDescription("Kayıt ol menüsünü açar."),

  async execute(interaction, client) {
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
          name: `Kayıt Ol`,
          value: `Kayıt işlemini tamamlamak için kayıdı gerçekleştir butonuna tıkladıktan sonra size verilen kodu açılacak olan pencereye giriniz.`,
          inline: false,
        },
      ]);

    const registerButton = new ButtonBuilder()
      .setCustomId("setRegisterationCode")
      .setLabel("Kaydı Gerçekleştir")
      .setStyle(ButtonStyle.Success);

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents([registerButton])],
      embeds: [embed],
    });
  },
};
