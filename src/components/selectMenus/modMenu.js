module.exports = {
  data: {
    name: `modMenu`,
  },
  async execute(interaction) {
    // TODO: selected mod channel should be saved to database
    
    await interaction.reply({
      content: `Mod Menu ${interaction.values[0]} selected`
    });
  },
};
