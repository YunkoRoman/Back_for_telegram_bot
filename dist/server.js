"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./utils/logger");
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(app_1.default());
server.listen(PORT, () => logger_1.logger.serverLogger.info(`Server listen port ${PORT}`));
//# sourceMappingURL=server.js.map