import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

export default {
  data: {
    name: "setLogChannel",
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    const select = new StringSelectMenuBuilder()
      .setCustomId("logMenu")
      .setPlaceholder("Log kanalını seçin!");

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
      content: "Logların düşeceği odayı seçin.",
      components: [row],
    });
  },
};
