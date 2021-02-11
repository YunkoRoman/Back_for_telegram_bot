"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserFields = exports.hasRole = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("./logger"));
const response_1 = require("./response");
const validator_1 = require("./validator");
const index_1 = require("../sequelize/models/index");
// eslint-disable-next-line import/prefer-default-export
function hasRole(roles) {
    return function validateAdminTelegramId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const telegramIdFromHeader = req.header('X-User-id');
            logger_1.default.info(telegramIdFromHeader);
            const validationErrors = validator_1.isValidTelegramId(telegramIdFromHeader);
            if (validationErrors.length === 0) {
                try {
                    const user = yield index_1.db.User.findOne({ where: { telegramId: telegramIdFromHeader } });
                    if (user !== null && roles.includes(user === null || user === void 0 ? void 0 : user.roleId)) {
                        next();
                    }
                    else {
                        const error = 'You do not have enough rights';
                        logger_1.default.error('Trying to access without sufficient rights');
                        response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.BAD_REQUEST);
                    }
                }
                catch (err) {
                    logger_1.default.error('Internall server error');
                    throw err;
                }
            }
            else {
                logger_1.default.error('No id in header');
                response_1.apiResponse(res, response_1.failedResponse(validationErrors), http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
        });
    };
}
exports.hasRole = hasRole;
function validateUserFields(req, res, next) {
    const errors = validator_1.invalidFields(req.body);
    if (errors.length > 0) {
        logger_1.default.error('Field validation failed');
        response_1.apiResponse(res, response_1.failedResponse(errors), http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    else {
        next();
    }
}
exports.validateUserFields = validateUserFields;
//# sourceMappingURL=middlewares.js.map