import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import fs from 'fs'

export default (client) => {
  client.handleCommands = async () => {
    const { logger } = client;
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = (await import(`../../commands/${folder}/${file}`)).default;
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        logger.info(`Komut: ${command.data.name} yüklendi`)
      }
    }

      const clientId = process.env.clientId;
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
}
