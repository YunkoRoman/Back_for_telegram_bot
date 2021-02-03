"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
function validateNewUser(user) {
    const errors = [];
    const { phoneNumber = '' } = user;
    if (!validator_1.default.isMobilePhone(phoneNumber)) {
        errors.push({ phoneNumber: 'is invalid mobile phone number' });
    }
    return errors;
}
exports.default = validateNewUser;
//# sourceMappingURL=validator.js.map