import { Logger, createLogger, format, transports } from 'winston';

const env: string = process.env.NODE_ENV || 'development';
const logger: Logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'foo' },
  exitOnError: false,
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.simple()
      ),
    }),
  ],
});

if (env === 'test') {
  logger.transports[0].silent = true;
}

if (env === 'production') {
  logger.configure({ level: 'warn' });
  logger.add(new transports.File({ filename: 'error.log', level: 'error' }));
  logger.add(new transports.File({ filename: `combined.log` }));
}

export default logger;
