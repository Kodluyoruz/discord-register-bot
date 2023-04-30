// TODO: If settings is not completed then it will render next select menu which is moderation channel

const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: "setRegChannel",
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const select = new StringSelectMenuBuilder()
      .setCustomId("regMenu")
      .setPlaceholder("Kayıt kanalını seçin!");

    // TODO: JUST SHOW TEXT CHANNELS ONLY
    interaction.guild.channels.cache.each((channel) => {
      select.addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(channel.name)
          .setValue(channel.id)
      );
    });

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.reply({
      content: "Kayıt kodunu girmek için kullanılacak kayıt odasını seçin.",
      components: [row],
    });
  },
};
