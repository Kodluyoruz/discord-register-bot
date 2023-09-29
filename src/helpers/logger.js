import { createLogger, format, transports } from "winston";

export default createLogger({
  format: format.combine(
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.stack || info.message}`)
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({
          all: true,
          colors: {
            info: "green",
            error: "red",
            warn: "yellow",
            debug: "blue",
          },
        })
      ),
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new transports.File({
      level: "info",
      filename: "logs/combined.log",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: "logs/exceptions.log",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});
