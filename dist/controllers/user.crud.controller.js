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
const logger_1 = __importDefault(require("../utils/logger"));
const user_role_model_1 = require("../sequelize/models/user.role.model");
const redisUser_1 = __importDefault(require("../cache/redisUser"));
class UserController {
    constructor(userService) {
        this.getAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('get all users');
                const users = yield this.userService.getAllUsers();
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while getting all users', {
                    meta: Object.assign({}, error),
                });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { telegramId } = req.params;
            try {
                logger_1.default.info('find user by id');
                console.log('redis get start');
                const getUserRedis = yield this.redisUserCache.getUser(telegramId);
                if (getUserRedis !== null) {
                    console.log('getUserRedis: ', getUserRedis);
                    return response_1.apiResponse(res, response_1.successResponse(getUserRedis), http_status_codes_1.StatusCodes.OK);
                }
                console.log('redis get end');
                console.log('ORM START CHECKPOINT');
                const result = yield this.userService.getUserById(telegramId);
                if (result.length > 0) {
                    const createdUser = yield this.redisUserCache.setUser(result[0]);
                    console.log('createdUser: ', createdUser);
                }
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                console.log('getUserById Error: ', error);
                logger_1.default.error('error while getting user by id', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.createNewUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            user.roleId = user_role_model_1.Role.regular;
            user.typeId = 1;
            try {
                logger_1.default.info('save new user');
                const result = yield this.userService.createUser(user);
                const createdUser = yield this.redisUserCache.setUser(result);
                console.log('createdUser: ', createdUser);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.CREATED);
            }
            catch (error) {
                logger_1.default.error('error while saving user', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.updateUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = Object.assign(Object.assign({}, req.body), { telegramId: req.params.telegramId });
            try {
                logger_1.default.info('update user by id');
                const result = yield this.userService.updateUser(user);
                if (result) {
                    if (result !== null) {
                        const updatedUser = yield this.redisUserCache.setUser(result[1][0]);
                        console.log('updatedUser: ', updatedUser);
                    }
                }
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while updating user');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.countAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('count all users');
                const result = yield this.userService.findAndCountAll();
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while counting users', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.countByType = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { typeId } = req.params;
            try {
                logger_1.default.info('count all users');
                const result = yield this.userService.findAndCountByType(parseInt(typeId, 10));
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while counting users by type', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id, telegramId } = req.params;
            try {
                logger_1.default.info('delete user by id');
                const result = yield this.userService.deleteUser(telegramId);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while deleting user', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getAllAdmins = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const roleId = user_role_model_1.Role.admin;
            try {
                logger_1.default.info('get all admins');
                const users = yield this.userService.getAllUsersByRole(roleId);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while getting all admins', {
                    meta: Object.assign({}, error),
                });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByTelegramName = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { telegramName } = req.params;
            try {
                const users = yield this.userService.getAllUsersByTelName(telegramName);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error getting users by telegram name', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByPhone = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { phone } = req.params;
            try {
                const users = yield this.userService.getAllUsersByPhone(phone);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error getting users by phone', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByCity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { city } = req.params;
            try {
                const users = yield this.userService.getAllUsersByCity(city);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error getting users by telegram city', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByName = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            try {
                const users = yield this.userService.getAllUsersByName(name);
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error getting users by telegram name', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByRole = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { role } = req.params;
            try {
                const users = yield this.userService.getAllUsersByRole(parseInt(role, 10));
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error getting users by role', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUserByType = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { type } = req.params;
            try {
                const users = yield this.userService.getAllUsersByRole(parseInt(type, 10));
                return response_1.apiResponse(res, response_1.successResponse(users), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error getting users by type', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.userService = userService;
        this.redisUserCache = new redisUser_1.default();
    }
}
exports.default = UserController;
//# sourceMappingURL=user.crud.controller.js.map