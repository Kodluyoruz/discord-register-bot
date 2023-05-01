import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

export default {
  data: {
    name: "setRole",
  },
  async execute(interaction) {
    const select = new StringSelectMenuBuilder()
      .setCustomId("roleMenu")
      .setPlaceholder("Bir rol seç!");

    interaction.guild.roles.cache.each((role) => {
      select.addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(role.name)
          .setValue(role.id)
      );
    });

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.reply({
      content: "Kod girişi sonrası kullanıcıya tanımlanacak rol",
      components: [row],
    });
  },
};
