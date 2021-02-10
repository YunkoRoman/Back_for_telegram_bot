"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRole = exports.UserRole = exports.Role = void 0;
const sequelize_1 = require("sequelize");
// eslint-disable-next-line no-shadow
var Role;
(function (Role) {
    // eslint-disable-next-line no-unused-vars
    Role[Role["regular"] = 0] = "regular";
    // eslint-disable-next-line no-unused-vars
    Role[Role["admin"] = 1] = "admin";
    // eslint-disable-next-line no-unused-vars
    Role[Role["superAdmin"] = 2] = "superAdmin";
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
        role: sequelize_1.DataTypes.ENUM(Role[0], Role[1], Role[2]),
    });
}
exports.initRole = initRole;
//# sourceMappingURL=user.role.model.js.map