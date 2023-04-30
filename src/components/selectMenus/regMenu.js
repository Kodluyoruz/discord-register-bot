module.exports = {
  data: {
    name: `regMenu`,
  },
  async execute(interaction) {
    // TODO: selected reg channel should be saved to database
    
    await interaction.reply({
      content: `Reg Menu ${interaction.values[0]} selected`
    });
  },
};
