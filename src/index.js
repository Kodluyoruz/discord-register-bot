import { ActivityType, Client, Collection, GatewayIntentBits, Options } from "discord.js";

import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";

import logger from "#helpers/logger";

dotenv.config();

process.noDeprecation = true;

const {
  DISCORD_BOT_TOKEN,
  MONGO_URI,
  THUMBNAIL_URL,
  DOCUMENT_URL,
  NAME_INPUT,
  CREATE_CODE,
  MEMBER_CACHE_SIZE,
} = process.env;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
  presence: {
    activities: [
      {
        name: "Kodluyoruz Kayıt Botu | https://github.com/Kodluyoruz/discord-register-bot/",
        type: ActivityType.Custom,
      },
    ],
  },
  makeCache: Options.cacheWithLimits({
    GuildMemberManager: MEMBER_CACHE_SIZE || 2000,
  }),
});

client.thumbnailUrl =
  THUMBNAIL_URL ||
  "https://github-production-user-asset-6210df.s3.amazonaws.com/39780/241442229-32cc8ae6-4423-4a4a-927f-bfaa34950035.png";

client.documentUrl = DOCUMENT_URL || "https://github.com/Kodluyoruz/discord-register-bot";

client.nameInput = NAME_INPUT === "1" ? 1 : 0;
client.createCode = CREATE_CODE === "1" ? 1 : 0;

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

client.logger = logger;

client.logger.info("Fonksiyon: fonksiyonlar yükleniyor");
const functionFolders = await fs.promises
  .readdir(`./src/functions`)
  .then((f) => f.filter((folder) => fs.statSync(`./src/functions/${folder}`).isDirectory()));

for (const folder of functionFolders) {
  client.logger.info(`Fonksiyon: └── ${folder} klasörü işleniyor`);
  const functionFiles = await fs.promises.readdir(`./src/functions/${folder}`);
  const jsFiles = functionFiles.filter((file) => file.endsWith(".js"));

  for (const file of jsFiles) {
    try {
      client.logger.info(`Fonksiyon:     ├── ${file} dosyası işleniyor`);
      const module = await import(`./functions/${folder}/${file}`);
      module.default(client);
    } catch (error) {
      client.logger.error(error);
    }
  }
}

client.logger.info("Fonksiyon: fonksiyonlar yüklendi");

client.logger.info("Fonksiyon: handlelar yükleniyor");
await Promise.all([client.handleEvents(), client.handleCommands(), client.handleComponents()]);
client.logger.info("Fonksiyon: handlelar yüklendi");

try {
  await mongoose.connect(MONGO_URI);
  client.logger.info("Database: bağlantı başarılı");
  client.logger.info("Client: client login ediliyor");
  await client.login(DISCORD_BOT_TOKEN);
} catch (error) {
  client.logger.error(error);
}
