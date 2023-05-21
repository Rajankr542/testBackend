require('dotenv').config();
const winston = require('winston');
const fs = require('fs');
require('winston-daily-rotate-file');

const { format, transports, config } = winston;
const logDir = 'logs';

/**
 * Create the `logs` directory if it does not exist
 */
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const transport = new transports.DailyRotateFile({
  filename: 'test-%DATE%.log',
  level: 'info',
  dirname: `${logDir}`,
  datePattern: 'DD-MM-YYYY',
  maxFiles: '30d',
});
const transporter = [transport];
if (process.env.ENV === 'dev') {
  transporter.push(new transports.Console());
}
const logger = new winston.createLogger({
  levels: config.npm.levels,
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(
      (info) =>
        `${info.level} : ${info.timestamp} : ${info.stack || info.message}`
    )
  ),
  transports: transporter,
  exitOnError: false,
});

module.exports = logger;
