export default {
  data: {
    name: "downloadCodes",
  },
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, client) {
    // TODO: DUMMY TEXT WILL BE OVERWRITTEN AND CODES MUST BE DOWNLOADED
    await interaction.reply({
      content: `Kodlar indirildi!`,
    });
  },
};
