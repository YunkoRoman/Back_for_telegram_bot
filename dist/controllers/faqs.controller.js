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
const dialogflow_1 = __importDefault(require("../dialogflow/dialogflow"));
const response_1 = require("../utils/response");
const logger_1 = require("../utils/logger");
const intent_parser_1 = require("../utils/intent.parser");
class FaqsController {
    constructor(faqsService, unansweredService) {
        this.dialogflowClient = new dialogflow_1.default();
        this.fetchIntents = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const intents = yield this.dialogflowClient.listIntents();
            if (intents.length > 0) {
                const faqs = intent_parser_1.parseIntents(intents);
                try {
                    const result = yield this.faqsService.storeIntents(faqs);
                    return response_1.apiResponse(res, response_1.successResponse({ 'fetched intents count': result.length }), http_status_codes_1.StatusCodes.OK);
                }
                catch (error) {
                    logger_1.logger.faqLogger.error('could not save intents as faqs', { meta: Object.assign({}, error) });
                    return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                }
            }
            const error = 'no intents received from dialogflow';
            logger_1.logger.faqLogger.error(error);
            return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        });
        this.updateCount = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { queryResult } = req.body;
            const intent = {
                fulfillmentMessages: queryResult.fulfillmentMessages,
                name: queryResult.intent.name,
                displayName: queryResult.intent.displayName,
            };
            try {
                const result = yield this.faqsService.updateCount(intent);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to update count', {
                    meta: Object.assign({}, error),
                });
                next(error);
            }
        });
        this.getAllFaqs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.faqLogger.info('get all faqs');
                const faqs = yield this.faqsService.getAllFaqs();
                return response_1.apiResponse(res, response_1.successResponse(faqs), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('error while getting all faqs', {
                    meta: Object.assign({}, error),
                });
                next(error);
            }
        });
        this.getFaqById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                logger_1.logger.faqLogger.info('get faq by id');
                const faqs = yield this.faqsService.getFaqById(parseInt(id, 10));
                return response_1.apiResponse(res, response_1.successResponse(faqs), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('error while getting faq by id', {
                    meta: Object.assign({}, error),
                });
                next(error);
            }
        });
        this.getFaqByQuestion = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faq = req.query;
            try {
                logger_1.logger.faqLogger.info('get faq by question');
                const faqs = yield this.faqsService.getFaqByQuestion(faq);
                return response_1.apiResponse(res, response_1.successResponse(faqs), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('error while getting faq by question', {
                    meta: Object.assign({}, error),
                });
                next(error);
            }
        });
        // Hardcoded info ID!!!
        this.getFacultyInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faqId = 1;
            try {
                logger_1.logger.faqLogger.info('get faculty info');
                const result = yield this.faqsService.getFaqById(faqId);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to get faculty info', {
                    meta: Object.assign({}, error),
                });
                next(error);
            }
        });
        this.getUniversityInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // University qustion id
            const faqId = 2;
            try {
                logger_1.logger.faqLogger.info('get university info');
                const result = yield this.faqsService.getFaqById(faqId);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to get university info', {
                    meta: Object.assign({}, error),
                });
                next(error);
            }
        });
        this.getPopularFaqs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.faqLogger.info('get popular faqs');
                const result = yield this.faqsService.getOnlyPopular();
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to get popular faqs', {
                    meta: Object.assign({}, error),
                });
                next(error);
            }
        });
        this.getAllUnanswered = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.faqLogger.info('get unanswered');
                const result = yield this.unansweredService.getAllUnanswered();
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to get unanswered');
                next(error);
            }
        });
        this.addFaq = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faq = req.body;
            try {
                logger_1.logger.faqLogger.info('add faq');
                const result = yield this.faqsService.addNewFaq(faq);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('error while adding faq', {
                    meta: Object.assign({}, error),
                });
                next(error);
            }
        });
        this.addUnanswered = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newUnansd = Object.assign({}, req.body);
            try {
                logger_1.logger.faqLogger.info('crete unanswered');
                const result = yield this.unansweredService.addNewUnanswered(newUnansd);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to create unanswered');
                next(error);
            }
        });
        this.getUnansweredByQuestion = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { question } = req.params;
            try {
                logger_1.logger.faqLogger.info('get unanswered by question');
                const result = yield this.unansweredService.getUnansweredByQuestion(question);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to get unanswered by question');
                next(error);
            }
        });
        this.faqsService = faqsService;
        this.unansweredService = unansweredService;
    }
}
exports.default = FaqsController;
//# sourceMappingURL=faqs.controller.js.map