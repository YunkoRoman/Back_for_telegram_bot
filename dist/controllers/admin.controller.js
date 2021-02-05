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
class AdminController {
    constructor(faqsService, userService, userTypesService, unansweredService) {
        this.getMostPopularFaqs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('find most popular faqs');
                const result = yield this.faqsService.getMostPopular();
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable to get most popular faqs');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUnanswered = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('getting all unanswered questions');
                const result = yield this.unansweredService.getAllUnanswered();
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable to get unanswered');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.editUniversityInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faqToEdit = req.body;
            // University qustion id
            faqToEdit.id = 2;
            try {
                logger_1.default.info('edit university info');
                const result = yield this.faqsService.updateFaqById(faqToEdit);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable to edit university info');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.editFacultyInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faqToEdit = req.body;
            // Faculty qustion id
            faqToEdit.id = 1;
            try {
                logger_1.default.info('edit faculty info');
                const result = yield this.faqsService.updateFaqById(faqToEdit);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable to edit faculty info');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.refreshFaqs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faqToEdit = req.body;
            try {
                logger_1.default.info('getting all faqs');
                const result = yield this.faqsService.getAllFaqs();
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable to get faqs');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.selectUsersByCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { type } = req.body;
            try {
                logger_1.default.info('select users by type');
                const result = yield this.userService.getAllUsersByType(type);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable select users by type');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getAllUserTypes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('get all user types');
                const faqs = yield this.userTypesService.getAllUserTypes();
                return response_1.apiResponse(res, response_1.successResponse(faqs), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while getting all user types', {
                    meta: Object.assign({}, error),
                });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.addNewType = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const type = req.body;
            try {
                logger_1.default.info('add new category(type)');
                const result = yield this.userTypesService.addNewUserType(type);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable select users by type');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.faqsService = faqsService;
        this.userService = userService;
        this.userTypesService = userTypesService;
        this.unansweredService = unansweredService;
    }
}
exports.default = AdminController;
//# sourceMappingURL=admin.controller.js.map