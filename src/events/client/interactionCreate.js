const { InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands, logger } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        logger.error(error);
        await interaction.reply({
          content: `Komut işlenirken bir hatayla karşılaşıldı.`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons, logger } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("Bu düğme için bir işlev ayarlanmamış.");

      try {
        await button.execute(interaction, client);
      } catch (error) {
        logger.error(error);
      }
    } else if (interaction.isSelectMenu()) {
      const { selectMenus, logger } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      if (!menu) return new Error("Bu menü için bir işlev ayarlanmamış.");

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        logger.error(error);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error("Bu modal için kod yazılmamış.");

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
