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
class FaqsService {
    // eslint-disable-next-line no-shadow
    constructor(db) {
        this.getMostPopular = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Faqs.findAll({
                order: [['stats', 'DESC']],
                limit: 10,
            });
            return result;
        });
        // ============ CRUD ==============
        this.getAllFaqs = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Faqs.findAll();
            return result;
        });
        this.getFaqById = (faqId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Faqs.findOne({ where: { id: faqId } });
            return result;
        });
        this.addNewFaq = (faq) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Faqs.create(faq);
            return result;
        });
        this.updateFaqById = (faq) => __awaiter(this, void 0, void 0, function* () {
            yield this.DB.Faqs.update(faq, { where: { id: faq.id } });
        });
        this.deleteFaqById = (faqId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Faqs.destroy({ where: { id: faqId } });
            return result;
        });
        this.DB = db;
    }
}
exports.default = FaqsService;
//# sourceMappingURL=faqs.service.js.map