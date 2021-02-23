"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidFields = exports.isValidTelegramId = void 0;
const validator_1 = __importDefault(require("validator"));
const user_role_model_1 = require("../sequelize/models/user.role.model");
// eslint-disable-next-line import/prefer-default-export
function isValidTelegramId(telegramId) {
    const errors = [];
    if (!telegramId) {
        errors.push('Please provide user telegram id');
        return errors;
    }
    if (!validator_1.default.isNumeric(telegramId)) {
        errors.push('Telegram id is not a number');
    }
    return errors;
}
exports.isValidTelegramId = isValidTelegramId;
function invalidFields(user) {
    const errors = [];
    if (user.roleId && ![user_role_model_1.Role.regular, user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin].includes(user.roleId)) {
        errors.push('User role is invalid');
    }
    return errors;
}
exports.invalidFields = invalidFields;
//# sourceMappingURL=validator.js.map