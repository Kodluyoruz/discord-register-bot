import { SlashCommandBuilder } from "discord.js";

import Guild from "../../schemas/guild.js";

export default {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Ornek database"),
  async execute(interaction, client) {
    let guildProfile = await Guild.getByGuildId(interaction.guild.id);
    if (!guildProfile) {
      guildProfile = await Guild.create({
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "None.",
      });
      //await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `Server Name: ${guildProfile.guildName}`,
      });
    } else {
      await interaction.reply({
        content: `Server ID: ${guildProfile.guildId}`,
      });
    }
  },
};
