import { readdirSync } from "fs";

export default (client) => {
  client.handleComponents = async () => {
    const componentFolders = readdirSync(`./src/components`);
    for (const folder of componentFolders) {
      const componentFiles = readdirSync(`./src/components/${folder}`).filter(
        (file) => file.endsWith(".js") //todo bu dosyaların içinde .js
          // uzantılı dosydan başka bir şey tutumamız gerektiği için bu kontrol
            // gereksiz olabilir
      );

      const { buttons, selectMenus, modals } = client;

      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = (await import(`../../components/${folder}/${file}`))
              .default;
            buttons.set(button.data.name, button);
          }
          break;

        case "selectMenus":
          for (const file of componentFiles) {
            const menu = (await import(`../../components/${folder}/${file}`))
              .default;
            selectMenus.set(menu.data.name, menu);
          }
          break;

        case "modals":
          for (const file of componentFiles) {
            const modal = (await import(`../../components/${folder}/${file}`))
              .default;
            modals.set(modal.data.name, modal);
          }
          break;

        default: //todo switch-case yapısında default olarak bir işlem
          // yapılmayacakasa bu blogun olmasında gerek yok silinebilir
          break;
      }
    }
  };
};
