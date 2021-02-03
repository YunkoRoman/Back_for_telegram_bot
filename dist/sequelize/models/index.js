"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const user_model_1 = require("./user.model");
const user_role_model_1 = require("./user.role.model");
const user_type_1 = require("./user.type");
const config_1 = __importDefault(require("../config/config"));
const env = process.env.NODE_ENV || 'development';
const params = config_1.default[env];
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL || params.url);
// const sequelize = new Sequelize(params.database, params.username, params.password, params);
const User = user_model_1.initUser(sequelize);
const Roles = user_role_model_1.initRole(sequelize);
const Types = user_type_1.initUserType(sequelize);
User.belongsTo(Roles);
User.belongsTo(Types);
exports.db = {
    sequelize,
    User,
    Roles,
    Types,
};
//# sourceMappingURL=index.js.map