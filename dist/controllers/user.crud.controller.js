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
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../utils/response");
const logger_1 = require("../utils/logger");
const user_role_model_1 = require("../sequelize/models/user.role.model");
const redisUser_1 = __importDefault(require("../cache/redisUser"));
class UserController {
    constructor(userService) {
        this.getAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.userLogger.info('get all users');
                const users = yield this.userService.getAllUsers();
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while getting all users', {
                    meta: Object.assign({}, error),
                });
                next(error);
            }
        });
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { telegramId } = req.params;
            try {
                logger_1.logger.userLogger.info('find user by id');
                console.log('redis get start');
                const getUserRedis = yield this.redisUserCache.getUser(telegramId);
                if (getUserRedis !== null) {
                    logger_1.logger.userLogger.info('getUserRedis: ', getUserRedis);
                    return response_1.apiResponse(res, response_1.successResponse(getUserRedis), http_status_codes_1.StatusCodes.OK);
                }
                logger_1.logger.userLogger.info('redis get end');
                logger_1.logger.userLogger.info('ORM START CHECKPOINT');
                const result = yield this.userService.getUserById(telegramId);
                if (result !== null) {
                    const createdUser = yield this.redisUserCache.setUser(result);
                    logger_1.logger.userLogger.info('createdUser: ', createdUser);
                }
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while getting user by id', { meta: Object.assign({}, error) });
                next(error);
            }
        });
        this.createNewUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            user.roleId = user_role_model_1.Role.regular;
            try {
                // todo error hendler for empty object
                console.log(user);
                logger_1.logger.userLogger.info('save new user');
                const result = yield this.userService.createUser(user);
                const createdUser = yield this.redisUserCache.setUser(result);
                logger_1.logger.userLogger.info('createdUser: ', createdUser);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.CREATED);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while saving user', { meta: Object.assign({}, error) });
                next(error);
            }
        });
        // todo super admin could not update himself
        this.updateUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = Object.assign(Object.assign({}, req.body), { telegramId: req.params.telegramId });
            console.log(req.params);
            try {
                logger_1.logger.userLogger.info('update user by id');
                const result = yield this.userService.updateUser(user);
                if (result) {
                    if (result[0] !== 0) {
                        const updatedUser = yield this.redisUserCache.setUser(result[1][0]);
                        logger_1.logger.userLogger.info(`updatedUser: ${updatedUser}`);
                    }
                }
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while updating user', {
                    meta: Object.assign({}, error),
                });
                next(error);
            }
        });
        this.countAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.userLogger.info('count all users');
                const result = yield this.userService.findAndCountAll();
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while counting users', { meta: Object.assign({}, error) });
                next(error);
            }
        });
        this.countByType = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { typeId } = req.params;
            try {
                logger_1.logger.userLogger.info('count all users');
                const result = yield this.userService.findAndCountByType(parseInt(typeId, 10));
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while counting users by type', { meta: Object.assign({}, error) });
                next(error);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id, telegramId } = req.params;
            try {
                logger_1.logger.userLogger.info('delete user by id');
                const result = yield this.userService.deleteUser(telegramId);
                const delUserRedis = yield this.redisUserCache.delUser(telegramId);
                console.log('DEL CAHCHED USER: ', delUserRedis);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while deleting user', { meta: Object.assign({}, error) });
                next(error);
            }
        });
        this.getAllAdmins = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const roleId = user_role_model_1.Role.admin;
            try {
                logger_1.logger.userLogger.info('get all admins');
                const users = yield this.userService.getAllUsersByRole(roleId);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while getting all admins', {
                    meta: Object.assign({}, error),
                });
                next(error);
            }
        });
        this.getUserByTelegramName = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { telegramName } = req.params;
            try {
                const users = yield this.userService.getAllUsersByTelName(telegramName);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by telegram name', { meta: Object.assign({}, error) });
                next(error);
            }
        });
        this.getUserByPhone = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { phone } = req.params;
            try {
                const users = yield this.userService.getAllUsersByPhone(phone);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by phone', { meta: Object.assign({}, error) });
                next(error);
            }
        });
        this.getUserByCity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { city } = req.params;
            try {
                const users = yield this.userService.getAllUsersByCity(city);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by telegram city', { meta: Object.assign({}, error) });
                next(error);
            }
        });
        this.getUserByName = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            try {
                const users = yield this.userService.getAllUsersByName(name);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by telegram name', { meta: Object.assign({}, error) });
                next(error);
            }
        });
        this.getUserByRole = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { role } = req.params;
            try {
                const users = yield this.userService.getAllUsersByRole(parseInt(role, 10));
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by role', { meta: Object.assign({}, error) });
                next(error);
            }
        });
        this.getUserByType = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { type } = req.params;
            try {
                const users = yield this.userService.getAllUsersByType(type);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by type', { meta: Object.assign({}, error) });
                next(error);
            }
        });
        this.userService = userService;
        this.redisUserCache = new redisUser_1.default();
    }
}
exports.default = UserController;
//# sourceMappingURL=user.crud.controller.js.map