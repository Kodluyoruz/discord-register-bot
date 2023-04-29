const { SlashCommandBuilder } = require('discord.js');
const mongoose=require("mongoose");
const Guild=require('../../schemas/guild');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('database')
    .setDescription('Ornek database'),
    async execute(interaction, client)  {
        console.log(interaction);
        console.log(interaction.user.username);
        console.log(interaction.member.guild.name);
        console.log(interaction.member.guild.id);
        console.log(Guild);
        let guildProfile = await Guild.findOne({guildId:interaction.member.guild.id});
        if (!guildProfile) {
            guildProfile=await new Guild(
                {
                    _id:mongoose.Types.ObjectId(),
                    guildId:interaction.member.guild.id,
                    guildName:interaction.member.guild.name,
                    guildIcon:interaction.member.guild.iconURL() ? interaction.member.guild.iconURL():"None."
               }
            );
        await guildProfile.save().catch(console.error);
        await interaction.reply(
            {
                content:`Server Name: ${guildProfile.guildName}`
            }
        );
        console.log(guildProfile);
        }else{
            await interaction.reply(
                {
                    content:`Server ID: ${guildProfile.guildId}`
                }
            );
            console.log(guildProfile);
        }

    }
};