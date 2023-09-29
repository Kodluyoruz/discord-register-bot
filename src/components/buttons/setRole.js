import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  RoleSelectMenuBuilder,
} from "discord.js";

export default {
  data: {
    name: "setRole",
  },
  generate() {
    return new ButtonBuilder()
      .setCustomId("setRole")
      .setLabel("Rol Tanımları")
      .setStyle(ButtonStyle.Success);
  },
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  async execute(interaction, client) {
    if (!client.user) return;

    const select = new RoleSelectMenuBuilder()
      .setCustomId("roleMenu")
      .setPlaceholder("Bir rol seç!");

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.deferReply({ ephemeral: true });

    const roleSelectEmbed = new EmbedBuilder()
      .setImage(client.thumbnailUrl)
      .setAuthor({
        url: client.documentUrl,
        iconURL: client.user.displayAvatarURL(),
        name: `Kodluyoruz Kayıt Botu`,
      })
      .setTitle("Rol Tanımları")
      .setDescription("Kod girişi sonrası kullanıcıya tanımlanacak rolü seçin");

    await interaction.editReply({
      embeds: [roleSelectEmbed],
      components: [row],
    });
  },
};
