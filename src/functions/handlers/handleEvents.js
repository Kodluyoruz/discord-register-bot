import fs from "node:fs";
import path from "node:path";
import * as mongo from "mongoose";

const EVENTS_PATH = './src/events/';

const isJs = (file = "") => file.endsWith(".js");
const isDir = (dir) => fs.statSync(path.join(EVENTS_PATH, dir)).isDirectory();

export default (client) => {
  const methods = { client, mongo };
  client.handleEvents = async () => {
    const eventFolders = fs.readdirSync(EVENTS_PATH).filter(isDir);
    for (const folder of eventFolders) {
      const eventPath = path.join(EVENTS_PATH, folder);
      const eventFiles = fs.readdirSync(eventPath).filter(isJs);
      const method = methods[folder];
      for (const file of eventFiles) {
        const eventFile = path.join('../', eventPath, file);
        const event = (await import(eventFile)).default;
        const listener = event.once ? method.once : method.on;
        listener(event.name, (...args) => event.execute(...args, client));
      }
    }
  };
};
