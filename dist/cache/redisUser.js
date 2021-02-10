"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
class RedisUser {
    constructor() {
        dotenv_1.default.config();
        // this.REDIS_URL = process.env.REDIS_URL || '';
        this.REDIS_URL = 'redis://127.0.0.1:6379';
        this.client = redis_1.createClient(this.REDIS_URL);
    }
    testConnection(test) {
        this.client.get('name', function (err, res) {
            if (err) {
                throw err;
            }
            if (res === 'brad') {
                console.log('Redis connected ', test);
            }
        });
    }
    setUser(user) {
        //   public setUser() {
        console.log('DATA FOR REDIS: ', user);
        console.log('DATA FOR REDIS: ', user.telegramId);
        this.client.setex(user.telegramId, 86400, JSON.stringify(user), (err, data) => {
            // this.client.setex(`${user.telegramId}`, 86400, 'test data for set', (err, data) => {
            if (err)
                throw err;
            if (data !== null) {
                return data;
            }
        });
    }
    //   public getUser(telegramId: number | string) {
    getUser(telegramId) {
        // this.client.get(telegramId as string, (err, data) => {
        //   console.log('telegramId: ', telegramId);
        //   console.log('errGET-USER', err);
        //   console.log('dataGet-user', data);
        //   if (err) {
        //     return err;
        //   }
        //   if (data !== null) {
        //     console.log('data-getuser', data);
        //     return data;
        //   }
        // });
        return new Promise((resolve, reject) => {
            this.client.get(telegramId, (err, data) => {
                console.log('telegramId: ', telegramId);
                console.log('errGET-USER', err);
                console.log('dataGet-user', data);
                if (err) {
                    return reject(err);
                }
                if (data !== null) {
                    console.log('data-getuser', data);
                    resolve(data);
                }
            });
        });
    }
}
exports.default = RedisUser;
//# sourceMappingURL=redisUser.js.map