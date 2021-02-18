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
const sequelize_1 = require("sequelize");
const logger_1 = require("../utils/logger");
class FaqsService {
    // eslint-disable-next-line no-shadow
    constructor(db) {
        this.getMostPopular = () => __awaiter(this, void 0, void 0, function* () {
            return this.DB.Faqs.findAll({
                order: [['stats', 'DESC']],
                limit: 10,
            });
        });
        this.getOnlyPopular = () => __awaiter(this, void 0, void 0, function* () {
            return this.DB.Faqs.findAll({
                where: {
                    question: {
                        [sequelize_1.Op.notIn]: ['faculty', 'university'],
                    },
                },
            });
        });
        this.updateCount = (intent) => __awaiter(this, void 0, void 0, function* () {
            return this.DB.Faqs
                .increment('stats', {
                where: {
                    intentName: intent.name,
                },
            });
        });
        this.storeIntents = (intents) => __awaiter(this, void 0, void 0, function* () {
            try {
                intents.forEach((intent) => __awaiter(this, void 0, void 0, function* () {
                    const faq = yield this.DB.Faqs
                        .findOne({ where: { intentName: intent.intentName } });
                    if (faq) {
                        return faq.update({ answer: intent.answer });
                    }
                    return this.DB.Faqs.create(Object.assign({}, intent));
                }));
                return intents;
            }
            catch (err) {
                logger_1.logger.faqLogger.error(err);
            }
            return [];
        });
        // ============ CRUD ==============
        this.getAllFaqs = () => __awaiter(this, void 0, void 0, function* () { return this.DB.Faqs.findAll(); });
        this.getFaqById = (faqId) => __awaiter(this, void 0, void 0, function* () {
            return this.DB.Faqs
                .findOne({ where: { id: faqId } });
        });
        this.getFaqByQuestion = (faq) => __awaiter(this, void 0, void 0, function* () {
            return this.DB.Faqs
                .findAll({
                where: {
                    question: {
                        [sequelize_1.Op.like]: faq.question,
                    },
                },
            });
        });
        this.addNewFaq = (faq) => __awaiter(this, void 0, void 0, function* () {
            return this.DB.Faqs
                .create(faq);
        });
        this.updateFaqById = (faq) => __awaiter(this, void 0, void 0, function* () {
            return this.DB.Faqs
                .update(faq, { where: { id: faq.id } });
        });
        this.deleteFaqById = (faqId) => __awaiter(this, void 0, void 0, function* () {
            return this.DB.Faqs
                .destroy({ where: { id: faqId } });
        });
        this.DB = db;
    }
}
exports.default = FaqsService;
//# sourceMappingURL=faqs.service.js.map