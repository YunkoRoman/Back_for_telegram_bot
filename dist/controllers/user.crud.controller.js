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
            const { id } = req.params;
            try {
                logger_1.default.info('find user by id');
                const result = yield this.userService.getUserById(parseInt(id, 10));
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while getting user by id', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.createNewUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            user.roleId = 1;
            user.typeId = 1;
            try {
                logger_1.default.info('save new user');
                const result = yield this.userService.createUser(user);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.CREATED);
            }
            catch (error) {
                logger_1.default.error('error while saving user', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.updateUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = Object.assign({ id: req.params.id }, req.body);
            try {
                logger_1.default.info('update user by id');
                const result = yield this.userService.updateUser(user);
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
            const { id } = req.params;
            try {
                logger_1.default.info('delete user by id');
                const result = yield this.userService.deleteUser(id);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while deleting user', { meta: Object.assign({}, error) });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.userService = userService;
    }
}
exports.default = UserController;
//# sourceMappingURL=user.crud.controller.js.map