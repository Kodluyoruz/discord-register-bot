const { readdirSync } = require("fs");

module.exports = (client) => {
  client.handleComponents = async () => {
    const componentFolders = readdirSync(`./src/components`);
    for (const folder of componentFolders) {
      const componentFiles = readdirSync(`./src/components/${folder}`).filter(
        (file) => file.endsWith(".js")
      );

      const { buttons, selectMenus, modals } = client;

      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
          }
          break;

        case "selectMenus":
          for (const file of componentFiles) {
            const menu = require(`../../components/${folder}/${file}`);
            selectMenus.set(menu.data.name, menu);
          }
          break;

        case "modals":
          for (const file of componentFiles) {
            const modal = require(`../../components/${folder}/${file}`);
            modals.set(modal.data.name, modal);
          }
          break;

        default:
          break;
      }
    }
  };
};
