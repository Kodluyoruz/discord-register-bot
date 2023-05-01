import { createLogger, format, transports } from "winston";

export default (client) => {
  client.createLogger = async () => {
    client.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.printf(
          (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
        )
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: "logs/error.log",
          level: "error",
        }),
        new transports.File({
          filename: "logs/combined.log",
        }),
      ],
    });
  };
};
