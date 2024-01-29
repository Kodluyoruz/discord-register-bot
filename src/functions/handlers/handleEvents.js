import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import mongoose from "mongoose";

const EVENTS_PATH = './src/events/';

const require = createRequire(import.meta.url);

const isJs = (file = "") => file.endsWith(".js");
const isDir = (dir, prefix = EVENTS_PATH) => {
  const target = path.join(prefix, dir);
  return fs.statSync(target).isDirectory();
}

export default (client) => {
  const methods = { client, mongo: mongoose };
  client.handleEvents = () => {
    const eventFolders = fs.readdirSync(EVENTS_PATH).filter(isDir);
    for (const folder of eventFolders) {
      const eventPath = path.join(EVENTS_PATH, folder);
      const eventFiles = fs.readdirSync(eventPath).filter(isJs);
      const method = methods[folder];
      for (const file of eventFiles) {
        const eventFile = path.join(eventPath, file);
        const event = require(eventFile).default;
        const listener = event.once ? method.once : method.on;
        listener(event.name, (...args) => event.execute(...args, client))
      }
    }
  };
};
