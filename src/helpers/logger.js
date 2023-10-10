import { createLogger, format, transports } from "winston";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES = 5;

export default createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${info.message} ${info.stack ? `\n${info.stack}` : ""}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: MAX_SIZE,
      maxFiles: MAX_FILES,
    }),
    new transports.File({ filename: "logs/combined.log", maxsize: MAX_SIZE, maxFiles: MAX_FILES }),
  ],
  exceptionHandlers: [
    new transports.Console(),
    new transports.File({
      filename: "logs/exceptions.log",
      maxsize: MAX_SIZE,
      maxFiles: MAX_FILES,
    }),
  ],
  rejectionHandlers: [
    new transports.Console(),
    new transports.File({
      filename: "logs/rejections.log",
      maxsize: MAX_SIZE,
      maxFiles: MAX_FILES,
    }),
  ],
});
