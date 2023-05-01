export default {
  data: {
    name: `logMenu`,
  },
  async execute(interaction) {
    // TODO: selected log channel should be saved to database

    await interaction.reply({
      content: `Log Menu ${interaction.values[0]} selected`,
    });
  },
};
