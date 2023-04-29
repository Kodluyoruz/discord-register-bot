module.exports = {
    data: {
      name: "setChannel",
    },
    // eslint-disable-next-line no-unused-vars
    async execute(interaction, client) {
      await interaction.reply({
        content: `Kanal ayarla!`,
      });
    },
  };
  