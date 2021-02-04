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
        host: process.env.DB_HOST_DEV,
        url: process.env.DATABASE_URL_DEV,
        port: process.env.DB_PORT_DEV,
        dialect: process.env.DB_DIALECT_DEV,
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