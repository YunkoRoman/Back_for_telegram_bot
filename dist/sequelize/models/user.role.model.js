"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRole = exports.UserRole = exports.Role = void 0;
const sequelize_1 = require("sequelize");
// eslint-disable-next-line no-shadow
var Role;
(function (Role) {
    // eslint-disable-next-line no-unused-vars
    Role["regular"] = "regular";
    // eslint-disable-next-line no-unused-vars
    Role["admin"] = "admin";
    // eslint-disable-next-line no-unused-vars
    Role["superAdmin"] = "superAdmin";
})(Role = exports.Role || (exports.Role = {}));
class UserRole extends sequelize_1.Model {
}
exports.UserRole = UserRole;
function initRole(sequelize) {
    return sequelize.define('chat_bot_roles', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role: sequelize_1.DataTypes.ENUM(Role.regular, Role.admin, Role.superAdmin),
    });
}
exports.initRole = initRole;
//# sourceMappingURL=user.role.model.js.map