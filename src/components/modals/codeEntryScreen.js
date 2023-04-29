module.exports = {
  data: {
    name: "codeEntryScreen",
  },
  async execute(interaction) {
    let codeInput = interaction.fields.getTextInputValue("codeInput");
    // let code = await client.db.get("code");
    let code = "123";

    if (codeInput == code) {
      await interaction.reply({
        content: `Kayıt kodunuz doğru. Hoşgeldiniz. ${interaction.user.username}, Kayıt kodunuz:${codeInput}`,
      });
      return;
    } else {
      await interaction.reply({
        content: `Kayıt kodunuz hatalı.`,
      });
      return;
    }
  },
};
