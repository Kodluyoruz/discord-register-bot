const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: {
    name: `roleMenu`,
  },
  async execute(interaction) {
    
    const setRegisterCodesButton = new ButtonBuilder()
      .setCustomId(`setRegisterCodes-${interaction.values[0]}`)
      .setLabel("Mevcut Kodları Gir")
      .setStyle(ButtonStyle.Success);

    const createNewRegisterCodesButton = new ButtonBuilder()
      .setCustomId(`createNewRegisterCodes-${interaction.values[0]}`)
      .setLabel("Kod Üret")
      .setStyle(ButtonStyle.Success);

    console.log(`${interaction.values[0]}`);

    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([setRegisterCodesButton, createNewRegisterCodesButton]),
      ],
    });
  },
};
