# Discord Register Bot

![banner](https://user-images.githubusercontent.com/39780/236168231-516d688e-8f15-45d5-a80f-889e0b7f0b00.png)

![coming soon](https://img.shields.io/badge/Status-Coming%20Soon-blue)

## About the Project

Discord Register Bot is a Discord bot that allows users to register and assign roles to themselves on a server using a registration code. New registration codes can be generated, log, moderation and registration channels can be specified.

The project uses Discord.js, dotenv, i18next, mongoose, winston libraries. It requires the latest version of [Node.js](https://nodejs.org/en/download), [MongoDB](https://www.mongodb.com/) database, [Discord Bot Registration](docs/BotKaydi.md).

## Getting Started

### How to Install and Run the Project

1. Make sure you have the LTS version or higher of **Node.js** installed. If you don't have Node.js installed, visit the following website and download and install it: [https://nodejs.org/en/](https://nodejs.org/en/)
2. Clone this project or download it from the project page by clicking on the "Code" button under "Download ZIP" and transfer the contents of the zip file to your working directory. To clone, use the following command:

   ```bash
   git clone https://github.com/Kodluyoruz/discord-register-bot
   ```

3. Type `npm install` in the console to install the necessary dependencies.
4. Open the console and go to the directory where the project is located.
5. Create a `.env` file and create a variable named `TOKEN` and assign your bot's token to it. You can get your token from Discord Developer Portal.
6. If you are using MongoDB database, create a variable named `MONGO_URI` and assign the MongoDB connection string to it.
7. To run your bot, type `node .` in the console.

### Settings

For the settings required for the project to work, you can check out the "[ProjeninCalistirilmasi.md](docs/projenincalistirilmasi.md/)" file from the link below.

```bash
DISCORD_BOT_TOKEN=<Discord Application Bot Token>
MONGO_URI=mongodb+srv://user:password@server/table
```

### Requirements

- Node.js 16.9.0 or newer version is required for Discord.js v14.

## Features

- Offers users who join the server the option to register in the registration channel.
- Users select the register option in the registration channel and enter their registration code.
- If the registration code is available in the system, the user is assigned the relevant role and given access to other parts of the server.
- If the registration code is not available in the system, an error message is displayed to the user and a retry request is made.
- Moderators can add or delete new registration codes for roles by selecting the set option in the moderation channel. They enter their registration code by selecting their role list from the opened menu.
- The administrator sets up log, moderation and registration channels using `/settings` command when setting up the bot for the first time.

## Contributing

If you encounter any errors or issues, please report them by opening an issue or sending a request. Also, if you want to contribute to this project, please send a pull request.

## Contributors

[Azat ESER](https://github.com/azateser)

[Bilgehan Zeki Özaytaç](https://github.com/WildGenie)

[Deniz Kaparlar](https://github.com/denizk1)

[Hasan Aydoğdu](https://github.com/haydogdu1990)

[Muhammed Mustafa Savar](https://github.com/muffafa)

[Uveys Gurbuz](https://github.com/uveysg)

## Documentation

## License

This project is licensed under [MIT license](https://choosealicense.com/licenses/mit/). You can check out [LICENSE](LICENSE) file for details of this license.
