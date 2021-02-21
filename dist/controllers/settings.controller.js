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
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../utils/response");
const logger_1 = require("../utils/logger");
class SettingsController {
    constructor(settingsService) {
        this.getAllSettings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.settingLogger.info('get all settings');
                const settings = yield this.settingsService.getAllSettings();
                return response_1.apiResponse(res, response_1.successResponse(settings), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.settingLogger.error('error while getting all settings', {
                    Path: req.originalUrl,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.udpdateById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const setting = Object.assign(Object.assign({}, req.body), { id: req.params.id });
            try {
                logger_1.logger.settingLogger.info('update setting', { Data: setting });
                const settings = yield this.settingsService.updateSetting(setting);
                return response_1.apiResponse(res, response_1.successResponse(settings), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.settingLogger.error('error while updating', {
                    Data: setting,
                    Path: req.originalUrl,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.createSetting = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { setting } = req.body;
            try {
                logger_1.logger.settingLogger.info('create setting', { Data: setting });
                const settings = yield this.settingsService.createSetting(setting);
                return response_1.apiResponse(res, response_1.successResponse(settings), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.settingLogger.error('error while creating', {
                    Data: setting,
                    Path: req.originalUrl,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.deleteValue = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { value } = req.body;
            try {
                logger_1.logger.settingLogger.info('delete setting', { Data: value });
                const settings = yield this.settingsService.deleteValue(value);
                return response_1.apiResponse(res, response_1.successResponse(settings), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.settingLogger.error('error while deleting setting', {
                    Data: value,
                    Path: req.originalUrl,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.settingsService = settingsService;
    }
}
exports.default = SettingsController;
//# sourceMappingURL=settings.controller.js.map