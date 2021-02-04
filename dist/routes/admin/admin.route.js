"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_types_service_1 = __importDefault(require("../../services/user.types.service"));
const admin_controller_1 = __importDefault(require("../../controllers/admin.controller"));
const faqs_service_1 = __importDefault(require("../../services/faqs.service"));
const user_crud_controller_1 = __importDefault(require("../../controllers/user.crud.controller"));
const user_service_1 = __importDefault(require("../../services/user.service"));
function adminStats(db) {
    const api = express_1.default.Router();
    const adminController = new admin_controller_1.default(new faqs_service_1.default(db), new user_service_1.default(db), new user_types_service_1.default(db));
    const userController = new user_crud_controller_1.default(new user_service_1.default(db));
    // Most popular FAQ
    api.get('/popular', adminController.getMostPopularFaqs);
    // Get all unanswered questions
    api.get('/unanswered', adminController.getUnanswered);
    // Get total number of users
    api.get('/count', userController.countAllUsers);
    // Get total users by group(type)
    api.get('/count/:typeId', userController.countByType);
    api.put('/faculty', adminController.editFacultyInfo);
    api.put('/university', adminController.editUniversityInfo);
    api.post('/categories', adminController.addNewType);
    api.get('/faqs', adminController.refreshFaqs);
    api.get('/categories/:typeId', adminController.selectUsersByCategory);
    return api;
}
exports.default = adminStats;
//# sourceMappingURL=admin.route.js.map