module.exports = {
    data: {
      name: "setRegisterCodes",
    },
    // eslint-disable-next-line no-unused-vars
    async execute(interaction, client, code) {
      await interaction.reply({
        content: `Set register ${code}`,
      });
    },
  };
  