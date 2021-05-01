
import winston, {format, createLogger} from "winston";

// const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
});

export default logger;