const { createLogger, format, transports } = require('winston');
const path = require('path');


module.exports = (client) => {
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
