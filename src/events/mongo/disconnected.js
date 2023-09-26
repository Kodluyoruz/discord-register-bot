export default {
  name: "disconnected",
  execute(client) {
    client.logger.warn("Veritabanı: bağlantısı devredışı");
  },
};
