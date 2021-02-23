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
const types_1 = require("../types/types");
const response_1 = require("../utils/response");
const logger_1 = require("../utils/logger");
const intent_parser_1 = require("../utils/intent.parser");
class FaqsController {
    constructor(faqsService, unansweredService) {
        this.dialogflowClient = new dialogflow_1.default();
        this.fetchIntents = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const intents = yield this.dialogflowClient.listIntents();
                if (intents.length > 0) {
                    const faqs = intent_parser_1.parseIntents(intents);
                    try {
                        const result = yield this.faqsService.storeIntents(faqs);
                        return response_1.apiResponse(res, response_1.successResponse({ 'fetched intents count': result.length }), http_status_codes_1.StatusCodes.OK);
                    }
                    catch (error) {
                        logger_1.logger.faqLogger.error('could not save intents as faqs', {
                            requestPath: req.originalUrl,
                            meta: Object.assign({}, error),
                        });
                        return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                    }
                }
                logger_1.logger.faqLogger.error('no intents received from dialogflow', { requestPath: req.originalUrl });
                return response_1.apiResponse(res, response_1.failedResponse('no intents received from dialogflow'), http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            catch (error) {
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`, { requestPath: req.originalUrl });
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
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
                    requestPath: req.originalUrl,
                    Data: intent,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
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
                    requestPath: req.originalUrl,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getFaqById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                logger_1.logger.faqLogger.info('get faq by id', { Data: id });
                const faqs = yield this.faqsService.getFaqById(parseInt(id, 10));
                return response_1.apiResponse(res, response_1.successResponse(faqs), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('error while getting faq by id', {
                    requestPath: req.originalUrl,
                    Data: id,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getFaqByIntentName = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { intentName } = req.params;
            try {
                logger_1.logger.faqLogger.info('get faq by id', { Data: intentName });
                const faqs = yield this.faqsService.getFaqByIntent(intentName);
                return response_1.apiResponse(res, response_1.successResponse(faqs), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('error while getting faq by id', {
                    requestPath: req.originalUrl,
                    Data: intentName,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getFaqByQuestion = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faq = req.query;
            try {
                console.log(req.originalUrl);
                logger_1.logger.faqLogger.info('get faq by question', { Data: faq });
                const faqs = yield this.faqsService.getFaqByQuestion(faq);
                return response_1.apiResponse(res, response_1.successResponse(faqs), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('error while getting faq by question', {
                    requestPath: req.originalUrl,
                    Data: faq,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getFacultyInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faqId = types_1.FACULTY_FAQ_INTENT_NAME;
            try {
                logger_1.logger.faqLogger.info('get faculty info');
                const result = yield this.faqsService.getFaqByIntent(faqId);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to get faculty info', {
                    requestPath: req.originalUrl,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getContactsInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faqId = types_1.CONTACTS_FAQ_INTENT_NAME;
            try {
                logger_1.logger.faqLogger.info('get contacts info');
                const result = yield this.faqsService.getFaqByIntent(faqId);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to get contacts info', {
                    requestPath: req.originalUrl,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUniversityInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faqId = types_1.UNIVERCITY_FAQ_INTENT_NAME;
            try {
                logger_1.logger.faqLogger.info('get university info');
                const result = yield this.faqsService.getFaqByIntent(faqId);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to get university info', {
                    requestPath: req.originalUrl,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
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
                    requestPath: req.originalUrl,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getAllUnanswered = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.faqLogger.info('get unanswered');
                const result = yield this.unansweredService.getAllUnanswered();
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to get unanswered', { requestPath: req.originalUrl, meta: error });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.addFaq = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const faq = req.body;
            try {
                logger_1.logger.faqLogger.info('add faq', { Data: faq });
                const result = yield this.faqsService.addNewFaq(faq);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('error while adding faq', {
                    requestPath: req.originalUrl,
                    Data: faq,
                    meta: Object.assign({}, error),
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.addUnanswered = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newUnansd = Object.assign({}, req.body);
            try {
                logger_1.logger.faqLogger.info('crete unanswered', { Data: newUnansd });
                const result = yield this.unansweredService.addNewUnanswered(newUnansd);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to create unanswered', {
                    requestPath: req.originalUrl,
                    Data: newUnansd,
                    meta: error,
                });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getUnansweredByQuestion = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { question } = req.params;
            try {
                logger_1.logger.faqLogger.info('get unanswered by question', { Data: question });
                const result = yield this.unansweredService.getUnansweredByQuestion(question);
                return response_1.apiResponse(res, response_1.successResponse(result), http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                logger_1.logger.faqLogger.error('unable to get unanswered by question', { requestPath: req.originalUrl, Data: question, meta: error });
                logger_1.logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
                return response_1.apiResponse(res, response_1.failedResponse(error), http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.faqsService = faqsService;
        this.unansweredService = unansweredService;
    }
}
exports.default = FaqsController;
//# sourceMappingURL=faqs.controller.js.map