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
const customErrors_1 = require("../errors/customErrors");
class UserController {
    constructor(userService) {
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.userLogger.info('get all users');
                const users = yield this.userService.getAllUsers();
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while getting all users', {
                    Path: req.originalUrl,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { telegramId } = req.params;
            try {
                logger_1.logger.userLogger.info('find user by id', { Data: telegramId });
                logger_1.logger.userLogger.info('redis get start');
                const getUserRedis = yield this.redisUserCache.getUser(telegramId);
                if (getUserRedis !== null) {
                    logger_1.logger.userLogger.info('getUserRedis: ', getUserRedis);
                    return response_1.apiResponse(res, response_1.successResponse(getUserRedis), http_status_codes_1.StatusCodes.OK);
                }
                logger_1.logger.redisLogger.info('redis get end');
                logger_1.logger.userLogger.info('ORM START CHECKPOINT');
                const result = yield this.userService.getUserById(telegramId);
                if (result !== null) {
                    const createdUser = yield this.redisUserCache.setUser(result);
                    logger_1.logger.userLogger.info('createdUser: ', createdUser);
                }
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while getting user by id', { Path: req.originalUrl, meta: Object.assign({}, error) });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.createNewUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            user.roleId = user_role_model_1.Role.regular;
            try {
                logger_1.logger.userLogger.info('save new user', { Data: user });
                const result = yield this.userService.createUser(user);
                const createdUser = yield this.redisUserCache.setUser(result);
                logger_1.logger.redisLogger.info('createdUser: ', { User: createdUser });
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.CREATED);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while saving user', { Path: req.originalUrl, Data: user, meta: Object.assign({}, error) });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.updateUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = Object.assign(Object.assign({}, req.body), { telegramId: req.params.telegramId });
            try {
                logger_1.logger.userLogger.info('update user by id', { Data: user });
                const result = yield this.userService.updateUser(user);
                if (result) {
                    if (result[0] !== 0) {
                        const updatedUser = yield this.redisUserCache.setUser(result[1][0]);
                        logger_1.logger.redisLogger.info('updatedUser:', { User: updatedUser });
                    }
                }
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while updating user', {
                    Path: req.originalUrl,
                    Data: user,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.countAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.userLogger.info('count all users');
                const result = yield this.userService.findAndCountAll();
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while counting users', { Path: req.originalUrl, meta: Object.assign({}, error) });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.countAllUsersTypes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.userLogger.info('count all users types');
                const result = yield this.userService.getStatsOfAllUsersByType();
                let Applicant = 0;
                let Parents = 0;
                let Teacher = 0;
                let Student = 0;
                let Other = 0;
                result.forEach((user) => {
                    const type = user.typeId;
                    switch (type) {
                        case 'Applicant':
                            Applicant += 1;
                            break;
                        case 'Parents':
                            Parents += 1;
                            break;
                        case 'Teacher':
                            Teacher += 1;
                            break;
                        case 'Student':
                            Student += 1;
                            break;
                        case 'Other':
                            Other += 1;
                            break;
                        default: break;
                    }
                });
                return response_1.apiResponse(res, response_1.successResponse({
                    Applicant, Parents, Teacher, Student, Other,
                }), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while counting users type stats', { Path: req.originalUrl, meta: Object.assign({}, error) });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.countByType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { typeId } = req.params;
            try {
                logger_1.logger.userLogger.info('count all users', { Data: typeId });
                const result = yield this.userService.findAndCountByType(typeId);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while counting users by type', {
                    Path: req.originalUrl,
                    Data: typeId,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { telegramId } = req.params;
            try {
                logger_1.logger.userLogger.info('delete user by id', { Data: telegramId });
                const result = yield this.userService.deleteUser(telegramId);
                if (result === 0) {
                    return response_1.apiResponse(res, response_1.failedResponse(customErrors_1.customErrors.NOT_FOUND.message), http_status_codes_1.StatusCodes.NOT_FOUND);
                }
                const deleteUser = yield this.redisUserCache.deleteUser(telegramId);
                logger_1.logger.redisLogger.info('User deleted from redis', { User: deleteUser });
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while deleting user', {
                    Path: req.originalUrl,
                    Data: telegramId,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getAllAdmins = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const roleId = user_role_model_1.Role.admin;
            try {
                logger_1.logger.userLogger.info('get all admins');
                const users = yield this.userService.getAllUsersByRole(roleId);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error while getting all admins', {
                    Path: req.originalUrl,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByTelegramName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { telegramName } = req.params;
            try {
                logger_1.logger.userLogger.info('get user by telegram name', { Data: telegramName });
                const users = yield this.userService.getAllUsersByTelName(telegramName);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by telegram name', {
                    Path: req.originalUrl,
                    Data: telegramName,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByPhone = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { phone } = req.params;
            try {
                logger_1.logger.userLogger.info('get user by phone', { Data: phone });
                const users = yield this.userService.getAllUsersByPhone(phone);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by phone', {
                    Path: req.originalUrl,
                    Data: phone,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByCity = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { city } = req.params;
            try {
                logger_1.logger.userLogger.info(' getting users by telegram city', { Data: city });
                const users = yield this.userService.getAllUsersByCity(city);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by telegram city', {
                    Path: req.originalUrl,
                    Data: city,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            try {
                logger_1.logger.userLogger.info(' getting users by telegram name', { Data: name });
                const users = yield this.userService.getAllUsersByName(name);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by telegram name', {
                    Path: req.originalUrl,
                    Data: name,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                logger_1.logger.userLogger.info(' getting users by role', { Data: id });
                const users = yield this.userService.getAllUsersByRole(parseInt(id, 10));
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by role', {
                    Path: req.originalUrl,
                    Data: id,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { type } = req.params;
            try {
                logger_1.logger.userLogger.info('error getting users by type', { Data: type });
                const users = yield this.userService.getAllUsersByType(type);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.userLogger.error('error getting users by type', {
                    Path: req.originalUrl,
                    Data: type,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error.message), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.userService = userService;
        this.redisUserCache = new redisUser_1.default();
    }
}
exports.default = UserController;
//# sourceMappingURL=user.crud.controller.js.map