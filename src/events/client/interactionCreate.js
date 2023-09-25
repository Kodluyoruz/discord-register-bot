import { InteractionType } from "discord.js";

export default {
  name: "interactionCreate",
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   * @param {import("discord.js").Client} client
   * @returns
   */
  async execute(interaction, client) {
    const { logger } = client;
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) {
        return;
      }

      try {
        await command.execute(interaction, client);
      } catch (error) {
        logger.error(error);
        await interaction.reply({
          content: `Komut işlenirken bir hatayla karşılaşıldı.`,
          ephemeral: true,
        });
      }
      return;
    }
    if (interaction.isButton()) {
      const { buttons } = client;
      const [customId, roleId] = interaction.customId.split("-");
      const button = buttons.get(customId);
      if (!button) {
        logger.error(`Component: düğme ${customId} için işlev tanımlanmamış`);
        return;
      }

      try {
        await button.execute(interaction, client, roleId);
      } catch (error) {
        logger.error(error);
      }
      return;
    }
    if (interaction.isAnySelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      if (!menu) {
        logger.error(`Component: menü ${customId} için işlev tanımlanmamış`);
        return;
      }

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        logger.error(error);
      }
      return;
    }
    if (interaction.type !== InteractionType.ModalSubmit) {
      return;
    }
    const { modals } = client;
    const [customId, roleId] = interaction.customId.split("-");
    const modal = modals.get(customId);
    if (!modal) {
      logger.error(`Component: modal ${customId} için işlev tanımlanmamış`);
      return;
    }

    try {
      await modal.execute(interaction, client, roleId);
    } catch (error) {
      logger.error(error);
    }
  },
};
