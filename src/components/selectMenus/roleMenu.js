import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
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

    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([
          setRegisterCodesButton,
          createNewRegisterCodesButton,
        ]),
      ],
    });
  },
};
