"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.json(), winston_1.default.format.prettyPrint()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console());
}
exports.default = logger;
//# sourceMappingURL=logger.js.map