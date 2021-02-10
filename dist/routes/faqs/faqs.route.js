"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faqs_service_1 = __importDefault(require("../../services/faqs.service"));
const faqs_controller_1 = __importDefault(require("../../controllers/faqs.controller"));
function infoRoute(db) {
    const api = express_1.default.Router();
    const faqsController = new faqs_controller_1.default(new faqs_service_1.default(db));
    // ========== CRUD ====================
    // GET all faqs
    api.get('/all', faqsController.getAllFaqs);
    api.get('/faculty', faqsController.getFacultyInfo);
    api.get('/university', faqsController.getUniversityInfo);
    api.get('/popular', faqsController.getPopularFaqs);
    api.get('/faq', faqsController.getFaqByQuestion);
    // GET faq by id
    api.get('/faq/:id', faqsController.getFaqById);
    return api;
}
exports.default = infoRoute;
//# sourceMappingURL=faqs.route.js.map