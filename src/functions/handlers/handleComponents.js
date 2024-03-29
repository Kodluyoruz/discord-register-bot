import fs from "fs";

export default (client) => {
  client.handleComponents = async () => {
    const componentFolders = fs
      .readdirSync(`./src/components`)
      .filter((folder) => fs.statSync(`./src/components/${folder}`).isDirectory());
    for (const folder of componentFolders) {
      const componentFiles = fs
        .readdirSync(`./src/components/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { buttons, selectMenus, modals } = client;

      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = (await import(`../../components/${folder}/${file}`)).default;
            buttons.set(button.data.name, button);
          }
          break;

        case "selectMenus":
          for (const file of componentFiles) {
            const menu = (await import(`../../components/${folder}/${file}`)).default;
            selectMenus.set(menu.data.name, menu);
          }
          break;

        case "modals":
          for (const file of componentFiles) {
            const modal = (await import(`../../components/${folder}/${file}`)).default;
            modals.set(modal.data.name, modal);
          }
          break;

        default:
          break;
      }
    }
  };
};
