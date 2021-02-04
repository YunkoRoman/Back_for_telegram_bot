"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUser = exports.User = void 0;
const sequelize_1 = require("sequelize");
const types_1 = require("../../types/types");
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
            type: new sequelize_1.DataTypes.STRING(32),
            unique: true,
            allowNull: false,
        },
        telegramName: {
            type: new sequelize_1.DataTypes.STRING(32),
            allowNull: true,
        },
        name: {
            type: new sequelize_1.DataTypes.STRING(32),
            allowNull: false,
        },
        phoneNumber: {
            type: new sequelize_1.DataTypes.STRING(64),
            allowNull: true,
            validate: {
                is: types_1.PHONE_REGEX,
            },
        },
        city: {
            type: new sequelize_1.DataTypes.STRING(32),
            allowNull: true,
        },
        step: {
            type: sequelize_1.DataTypes.JSON,
        },
        roleId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        typeId: {
            type: sequelize_1.DataTypes.INTEGER,
        },
    });
}
exports.initUser = initUser;
//# sourceMappingURL=user.model.js.map