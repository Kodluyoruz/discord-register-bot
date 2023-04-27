const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Örnek embed mesajı gönderir'),
    async execute(interaction, client)  {
        const embed = new EmbedBuilder()
        .setTitle('Embded Testi')
        .setDescription('Örnek bir embed mesajıdır.')
        .setColor(Colors.Blue)
        .setImage(client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setAuthor({
            url: 'https://github.com/Kodluyoruz/discord-register-bot',
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.user.tag
        })
        .setFooter({
            iconUrL: client.user.displayAvatarURL(),
            text: client.user.tag
        })
        .setURL('https://github.com/Kodluyoruz/discord-register-bot')
        .addFields([
            {
                name: `Kodluyoruz Discord Kayıt Botu`,
                value: `Bu bot Kodluyoruz tarafından açık kaynak olarak geliştirilmektedir.`,
                inline: false
            }
        ])

        await interaction.reply({
            embeds: [embed]
        })
    }
}