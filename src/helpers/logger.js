import { createLogger, format, transports } from "winston";

export default createLogger({
  format: format.combine(
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.stack || info.message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 2_097_152,
    }),
    new transports.File({
      filename: "logs/combined.log",
      maxsize: 2_097_152,
    }),
  ],
});
