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
class FaqsController {
    constructor(faqsService, unansweredService) {
        this.getAllFaqs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('get all faqs');
                const faqs = yield this.faqsService.getAllFaqs();
                return response_1.apiResponse(res, response_1.successResponse(faqs), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while getting all faqs', {
                    meta: Object.assign({}, error),
                });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getFaqById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                logger_1.default.info('get faq by id');
                const faqs = yield this.faqsService.getFaqById(parseInt(id, 10));
                return response_1.apiResponse(res, response_1.successResponse(faqs), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while getting faq by id', {
                    meta: Object.assign({}, error),
                });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getFaqByQuestion = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faq = req.query;
            try {
                logger_1.default.info('get faq by question');
                const faqs = yield this.faqsService.getFaqByQuestion(faq);
                return response_1.apiResponse(res, response_1.successResponse(faqs), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('error while getting faq by question', {
                    meta: Object.assign({}, error),
                });
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        // Hardcoded info ID!!!
        this.getFacultyInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faqId = 1;
            try {
                logger_1.default.info('get faculty info');
                const result = yield this.faqsService.getFaqById(faqId);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable to get faculty info');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUniversityInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // University qustion id
            const faqId = 2;
            try {
                logger_1.default.info('get university info');
                const result = yield this.faqsService.getFaqById(faqId);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable to get university info');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getPopularFaqs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('get popular faqs');
                const result = yield this.faqsService.getOnlyPopular();
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable to get popular faqs');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getAllUnanswered = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('get unanswered');
                const result = yield this.unansweredService.getAllUnanswered();
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable to get unanswered');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.addUnanswered = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newUnansd = Object.assign({}, req.body);
            try {
                logger_1.default.info('crete unanswered');
                const result = yield this.unansweredService.addNewUnanswered(newUnansd);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable to create unanswered');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUnansweredByQuestion = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { question } = req.params;
            try {
                logger_1.default.info('get unanswered by question');
                const result = yield this.unansweredService.getUnansweredByQuestion(question);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.default.error('unable to get unanswered by question');
                return response_1.apiResponse(res, response_1.failedResponse(http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.faqsService = faqsService;
        this.unansweredService = unansweredService;
    }
}
exports.default = FaqsController;
//# sourceMappingURL=faqs.controller.js.map