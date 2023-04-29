const { createLogger, format, transports } = require('winston');
const path = require('path');


module.exports = (client) => {
  //todo burada createLogger tek sefer çalışacak ve daha sonra clinet.logger
  // ile ulaşılacak şeklinde anladım. Eğer öyleyse bu fonksiyonu
  // client.createLogger şeklinde cliente ekleyip daha sonra index.js'de
  // çalıştırmak yereine direkt bu fonkisiyonun içindekiler bir üst scopeda
  // yapılabilir böylece daha temiz olabilir.
  client.createLogger = async () => {
    client.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: path.join(__dirname, '../../logs', 'error.log'),
          level: 'error',
        }),
        new transports.File({
          filename: path.join(__dirname, '../../logs', 'combined.log'),
        }),
      ],
    });
  };
};
