module.exports = {
  data: {
    name: "sub",
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    await interaction.reply({
      content: `Selam Dünya!`,
    });
  },
};
