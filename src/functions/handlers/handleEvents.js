import fs from "fs";
import mongoose from "mongoose";

export default (client) => {
  client.handleEvents = async () => {
    const eventFolders = fs.readdirSync(`./src/events`);
    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));
      switch (folder) {
        case "client":
          for (const file of eventFiles) {
            const event = (await import(`../../events/${folder}/${file}`))
              .default;
            if (event.once) {
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            } else {
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
          }
          break;
        case "mongo":
          for (const file of eventFiles) {
            const event = (await import(`../../events/${folder}/${file}`))
              .default;
            if (event.once) {
              mongoose.connection.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            } else {
              mongoose.connection.on(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
          }
          break;
        default:
          break;
      }
    }
  };
};
