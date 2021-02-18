"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../utils/logger");
class RedisUser {
    constructor() {
        dotenv_1.default.config();
        this.REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
        // this.REDIS_URL = 'redis://127.0.0.1:6379';
        logger_1.logger.redisLogger.info(`REDIS_URL: ${this.REDIS_URL}`);
        this.client = redis_1.createClient(this.REDIS_URL);
    }
    testConnection(test) {
        this.client.get('name', (err, res) => {
            if (err) {
                throw err;
            }
            if (res === 'brad') {
                console.log('Redis connected ', test);
            }
        });
    }
    setUser(user) {
        return new Promise((resolve, reject) => {
            this.client.setex(user.telegramId, 86400, JSON.stringify(user), (err, data) => {
                if (err) {
                    reject(err);
                    logger_1.logger.redisLogger.error(`${err}`);
                }
                resolve(data);
            });
        });
    }
    getUser(telegramId) {
        return new Promise((resolve, reject) => {
            this.client.get(telegramId, (err, data) => {
                if (err) {
                    reject(err);
                    logger_1.logger.redisLogger.error(`${err}`);
                }
                if (data !== null) {
                    resolve(JSON.parse(data));
                }
                else {
                    resolve(data);
                }
            });
        });
    }
}
exports.default = RedisUser;
//# sourceMappingURL=redisUser.js.map