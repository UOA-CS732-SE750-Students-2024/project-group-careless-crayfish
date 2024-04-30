const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(
      winston.format.errors({ stack: true }),
      winston.format.colorize(),
      winston.format.simple()
    ),
  ],
});

module.exports = logger;
