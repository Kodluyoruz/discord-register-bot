const { ButtonBuilder, ButtonStyle, ChannelType, ActionRowBuilder } = require('discord.js');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const { logger } = client;
        logger.info(`${client.user.tag} ismi ile giriş yapıldı.`)
        client.user.setPresence({ activities: [{ name: 'Kodluyoruz Kayıt Botu | Link: https://github.com/Kodluyoruz/discord-register-bot/'}] });

        const guild = client.guilds.cache.first();
        const channel = guild.channels.cache.find(channel => channel.type === ChannelType.GuildText);

        const row = new ActionRowBuilder().addComponents(
             new ButtonBuilder()
                .setCustomId("sub")
                .setLabel("Kayıt Olmak İçin Tıkla")
                .setStyle(ButtonStyle.Primary)
        );

        await channel.send({
            content: `Merhaba, ${guild.name} sunucusuna hoşgeldin!`,
            components: [row]
        })

    }
}