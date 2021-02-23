"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const unanswered_service_1 = __importDefault(require("../../services/unanswered.service"));
const faqs_service_1 = __importDefault(require("../../services/faqs.service"));
const faqs_controller_1 = __importDefault(require("../../controllers/faqs.controller"));
const middlewares_1 = require("../../utils/middlewares");
function infoRoute(db) {
    const api = express_1.default.Router();
    const faqsController = new faqs_controller_1.default(new faqs_service_1.default(db), new unanswered_service_1.default(db));
    // ========== FETCH INTENTS ===========
    api.get('/refresh', faqsController.fetchIntents);
    // ========== UPDATE COUNT ============
    api.post('/update', faqsController.updateCount);
    // ========== CRUD ====================
    // GET all faqs
    api.get('/all', faqsController.getAllFaqs);
    api.get('/faculty', faqsController.getFacultyInfo);
    api.get('/university', faqsController.getUniversityInfo);
    api.get('/contacts', faqsController.getContactsInfo);
    api.get('/popular', faqsController.getPopularFaqs);
    api.get('/faq', faqsController.getFaqByQuestion);
    api.post('/faq', faqsController.addFaq);
    // GET faq by id
    api.get('/faq/:id', middlewares_1.check_idMiddleware, faqsController.getFaqById);
    api.get('/faq/intent', faqsController.getFaqByIntentName);
    api.get('/unanswered', faqsController.getAllUnanswered);
    api.get('/unanswered/:question', faqsController.getUnansweredByQuestion);
    api.post('/unanswered', faqsController.addUnanswered);
    return api;
}
exports.default = infoRoute;
//# sourceMappingURL=faqs.route.js.map