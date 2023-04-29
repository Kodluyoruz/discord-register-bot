module.exports = {
    data: {
      name: "createNewRegisterCodes",
    },
    // eslint-disable-next-line no-unused-vars
    async execute(interaction, client, code) {
      await interaction.reply({
        content: `Create register ${code}`,
      });
    },
  };
  