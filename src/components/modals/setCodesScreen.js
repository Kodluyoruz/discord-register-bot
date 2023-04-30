module.exports = {
    data: {
      name: "setCodesScreen",
    },
    async execute(interaction, client, roleId) {
      const codes = interaction.fields.getTextInputValue("codesInput");
      // TODO: split codes by commas
      // TODO: save codes into database with roleCode

      await interaction.reply({
        content: `Oluştrulmak istenen kodlar: ${codes}\nAtanacak rol:${roleId}`,
      });
    },
  };
  