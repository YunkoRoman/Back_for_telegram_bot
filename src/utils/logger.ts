const { createLogger, format, transports, config } = require("winston");
const { combine, timestamp, json } = format;

const userLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: "user-service" },
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    json()
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log" })
  ]
});

const adminLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: "admin-service" },
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    json()
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log" })
  ]
});
const faqLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: "admin-service" },
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    json()
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log" })
  ]
});
const serverLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: "Server" },
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    json()
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log" })
  ]
});
const settingLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: "Setting-service" },
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    json()
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log" })
  ]
});

const redisLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: "Redis" },
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    json()
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log" })
  ]
});
const middlewarwLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: "middleware" },
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    json()
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log" })
  ]
});

export const logger = {
  userLogger: userLogger,
  adminLogger: adminLogger,
  faqLogger: faqLogger,
  serverLogger: serverLogger,
  settingLogger: settingLogger,
  redisLogger: redisLogger,
  middlewarwLogger: middlewarwLogger
};
