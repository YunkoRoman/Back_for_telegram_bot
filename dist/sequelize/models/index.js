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
const sequelize = new sequelize_1.Sequelize(params.database, params.username, params.password, params);
const User = user_model_1.initUser(sequelize);
const Roles = user_role_model_1.initRole(sequelize);
const Types = user_type_1.initUserType(sequelize);
User.belongsToMany(Roles, { through: 'chat_bot_users_has_roles' });
Roles.belongsToMany(User, { through: 'chat_bot_users_has_roles' });
Types.belongsTo(User);
exports.db = {
    sequelize,
    User,
    Roles,
    Types,
};
//# sourceMappingURL=index.js.map