require("dotenv").config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')
const fs = require("fs");

/**
 * todo
 * 1) Burada artık discord.js'in yeni göncellemesiyle komutları sunucuya
 * yüklemek içn @discordjs/rest ve discord-api-types/v9 kullanmamıza gerek yok
 * direkt discord.js aracılığı ile kaydedebiliriz. Kısaca şöyle;
 *    Global komutlar için:  client.application.commands.set(slashCommands) https://discord.js.org/#/docs/discord.js/main/class/ApplicationCommandManager
 *    Sunucu komutları için: guild.commands.set(slashCommands) https://discord.js.org/#/docs/discord.js/main/class/GuildApplicationCommandManager
 *
*   Bu şekilde çok daha kolay ve kısa olabilir.
 *
*  2) Aşığıda belirttiğim kısımının ayrı bir dosayada olması daha iyi olabilir
 */

module.exports = (client) => {
  client.handleCommands = async () => {
    const { logger } = client;
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        logger.info(`Komut: ${command.data.name} yüklendi`)
      }
    }

    //todo burdan sonrası komutları bota register etmek için ve handle'dan
    // ayrı bir işlem olarak ayrı bir dosyada commandRegister.js şeklinde
    // ayrılabilir.
    const clientId = process.env.clientId; //todo client id'ye client.user.id
    // şeklinde ulaşabilirsiniz. Tabi önce login olması gerekebilir tam
    // olarak emin değilim.
      const guildId = process.env.guildId;
      const rest = new REST({ version: '9'}).setToken(process.env.token);
      try {
        logger.info("Uygulama (/) komutları yükleniyor.")

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: client.commandArray,
        })

        logger.info("Uygulama (/) komutları başarıyla yüklendi.")
      } catch (error) {
        logger.error(error)
      }
  };
};
