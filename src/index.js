import dotenv from "dotenv";
import mongoose from "mongoose";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import fs from "fs";

dotenv.config();

const { DISCORD_BOT_TOKEN, MONGO_URI } = process.env;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    (await import(`./functions/${folder}/${file}`)).default(client);
  }
}

await client.createLogger();
await client.handleEvents();
await client.handleCommands();
await client.handleComponents();

await mongoose.connect(MONGO_URI);
await client.login(DISCORD_BOT_TOKEN);
