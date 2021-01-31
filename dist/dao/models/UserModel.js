"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_interface_1 = require("interfaces/user-interface");
const types_1 = require("sequelize/types");
const dbConnection_1 = require("../dbConnection");
class User extends types_1.Model {
}
User.init({
    id: {
        type: types_1.DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: types_1.DataTypes.STRING,
        allowNull: false,
    },
    telegramName: {
        type: types_1.DataTypes.STRING,
        allowNull: false,
    },
    telegramId: {
        type: types_1.DataTypes.UUIDV4,
        allowNull: false,
    },
    phoneNumber: {
        type: types_1.DataTypes.NUMBER,
    },
    city: {
        type: types_1.DataTypes.STRING,
    },
    role: {
        type: types_1.DataTypes.ENUM,
        allowNull: false,
        defaultValue: user_interface_1.UserRole.regular,
    },
    state: {
        type: types_1.DataTypes.JSONB,
    },
}, {
    sequelize: dbConnection_1.sequelize,
    modelName: 'Users',
});
//# sourceMappingURL=UserModel.js.map