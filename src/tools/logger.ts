import winston from 'winston'
import { STAGE } from '~/constants'

const logger = winston.createLogger({
  level:
    STAGE === 'production'
      ? process.env.LOGGER_LEVEL || 'info'
      : process.env.LOGGER_LEVEL || 'verbose',
})

switch (STAGE) {
  case 'development':
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.splat(),
          winston.format.errors({ stack: true }),
          winston.format.printf(({ level, message, timestamp, error = '' }) => {
            return `${timestamp} ${level}: ${message}${
              error?.stack ? ' - ' + error.stack || '' : ''
            }`
          })
        ),
      })
    )
    break
  default:
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.splat(),
          winston.format.errors({ stack: true }),
          winston.format.printf(({ level, message, timestamp, error = '' }) => {
            return `${timestamp} ${level}: ${message}${
              error?.stack ? ' - ' + error.stack || '' : ''
            }`
          })
        ),
      })
    )
    break
}

export default logger
