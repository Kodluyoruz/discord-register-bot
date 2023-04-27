module.exports = {
    data: {
      name: `sub-menu`,
    },
    // eslint-disable-next-line no-unused-vars
    async execute(interaction, client) {
      await interaction.reply({
        content: `Seçmiş olduğunuz değer ${interaction.values[0]}`,
      });
    },
  };
  