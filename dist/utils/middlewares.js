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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserFields = exports.check_idMiddleware = exports.hasRole = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("./logger");
const validator_1 = require("./validator");
const index_1 = require("../sequelize/models/index");
const errorHandler_1 = require("../errors/errorHandler");
const customErrors_1 = require("../errors/customErrors");
// eslint-disable-next-line import/prefer-default-export
function hasRole(roles) {
    return function validateAdminTelegramId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const telegramIdFromHeader = req.header('X-User-id');
            logger_1.logger.userLogger.info(telegramIdFromHeader);
            const validationErrors = validator_1.isValidTelegramId(telegramIdFromHeader);
            if (validationErrors.length === 0) {
                try {
                    const user = yield index_1.db.User.findOne({ where: { telegramId: telegramIdFromHeader } });
                    if (user !== null && roles.includes(user === null || user === void 0 ? void 0 : user.roleId)) {
                        next();
                    }
                    else {
                        logger_1.logger.middlewarwLogger.error('Trying to access without sufficient rights');
                        return next(new errorHandler_1.ErrorHandler(http_status_codes_1.StatusCodes.FORBIDDEN, customErrors_1.customErrors.FORBIDDEN.message));
                    }
                }
                catch (err) {
                    logger_1.logger.middlewarwLogger.error('Internal server error');
                    next(err);
                }
            }
            else {
                logger_1.logger.userLogger.error('No id in header');
                return next(new errorHandler_1.ErrorHandler(http_status_codes_1.StatusCodes.BAD_REQUEST, customErrors_1.customErrors.BAD_REQUEST_NO_TELEGRAM_ID.messageHeader));
            }
        });
    };
}
exports.hasRole = hasRole;
function check_idMiddleware(req, res, next) {
    const { telegramId, id } = req.params;
    let idForCheck;
    telegramId ? (idForCheck = telegramId) : (idForCheck = id);
    try {
        const validationErrors = validator_1.isValidTelegramId(idForCheck);
        console.log(validationErrors);
        if (validationErrors.length === 0) {
            next();
        }
        else {
            logger_1.logger.middlewarwLogger.error(validationErrors, { Data: telegramId });
            return next(new errorHandler_1.ErrorHandler(http_status_codes_1.StatusCodes.BAD_REQUEST, validationErrors[0]));
        }
    }
    catch (error) {
        logger_1.logger.userLogger.error('No telegram_id in params');
        next(error);
    }
}
exports.check_idMiddleware = check_idMiddleware;
function validateUserFields(req, res, next) {
    const errors = validator_1.invalidFields(req.body);
    if (errors.length > 0) {
        logger_1.logger.userLogger.error('Field validation failed', { meta: errors });
        return next(new errorHandler_1.ErrorHandler(http_status_codes_1.StatusCodes.BAD_REQUEST, `${errors}`));
    }
    next();
}
exports.validateUserFields = validateUserFields;
//# sourceMappingURL=middlewares.js.map