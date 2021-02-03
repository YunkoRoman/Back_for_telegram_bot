"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUser = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
function initUser(sequelize) {
    return sequelize.define('chat_bot_users', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        telegramId: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        telegramName: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: true,
        },
        name: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        phoneNumber: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: true,
        },
        city: {
            type: new sequelize_1.DataTypes.STRING(128),
        },
        step: {
            type: sequelize_1.DataTypes.JSON,
        },
    });
}
exports.initUser = initUser;
//# sourceMappingURL=user.model.js.map