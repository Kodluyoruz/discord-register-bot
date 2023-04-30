module.exports = {
    data: {
      name: "createCodesScreen",
    },
    async execute(interaction, client, roleId) {
      const codeNumber = interaction.fields.getTextInputValue("codeNumberInput");
      // TODO: create random codes by code number input
      // TODO: check if code number input is valid (is it a number?)
      // TODO: convert string input to number 
      // TODO: save codes to database with roleCode

      await interaction.reply({
        content: `Oluştrulmak istenen kod sayısı: ${codeNumber}\nAtanacak rol:${roleId}`,
      });
    },
  };
  