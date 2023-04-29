module.exports = {
    data: {
      name: "setRole",
    },
    // eslint-disable-next-line no-unused-vars
    async execute(interaction, client) {
      await interaction.reply({
        content: `Rol ayarla!`,
      });
    },
  };
  