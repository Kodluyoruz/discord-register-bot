const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: "setRole",
  },
  async execute(interaction) {
    const select = new StringSelectMenuBuilder()
      .setCustomId("roleMenu")
      .setPlaceholder("Make a selection!");

      interaction.guild.channels.cache.each((role) => {
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
