"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
const redisUser_1 = __importDefault(require("./cache/redisUser"));
const PORT = process.env.PORT || 5000;
console.log('PORT: ', PORT);
const server = http_1.default.createServer(app_1.default());
server.listen(PORT, () => logger_1.default.info('running'));
const checkRedisCon = new redisUser_1.default();
//# sourceMappingURL=server.js.map