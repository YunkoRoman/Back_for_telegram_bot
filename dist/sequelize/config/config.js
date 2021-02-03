"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        username: process.env.DB_USER_DEV,
        password: process.env.DB_PASSWORD_DEV,
        database: process.env.DB_NAME_DEV,
        host: '127.0.0.1',
        url: process.env.DATABASE_URL,
        port: process.env.DB_PORT_DEV,
        dialect: process.env.DB_DIALECT_DEV,
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        url: process.env.DATABASE_URL,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        dialect: process.env.DB_DIALECT,
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map