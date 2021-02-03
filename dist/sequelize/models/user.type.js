"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserType = exports.UserRole = void 0;
const sequelize_1 = require("sequelize");
class UserRole extends sequelize_1.Model {
}
exports.UserRole = UserRole;
function initUserType(sequelize) {
    return sequelize.define('chat_bot_user_type', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userType: new sequelize_1.DataTypes.STRING(128),
    });
}
exports.initUserType = initUserType;
//# sourceMappingURL=user.type.js.map