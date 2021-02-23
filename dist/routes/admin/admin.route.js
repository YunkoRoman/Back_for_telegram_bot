"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const unanswered_service_1 = __importDefault(require("../../services/unanswered.service"));
const user_types_service_1 = __importDefault(require("../../services/user.types.service"));
const admin_controller_1 = __importDefault(require("../../controllers/admin.controller"));
const faqs_service_1 = __importDefault(require("../../services/faqs.service"));
const user_crud_controller_1 = __importDefault(require("../../controllers/user.crud.controller"));
const user_service_1 = __importDefault(require("../../services/user.service"));
const middlewares_1 = require("../../utils/middlewares");
const user_role_model_1 = require("../../sequelize/models/user.role.model");
function adminStats(db) {
    const api = express_1.default.Router();
    const adminController = new admin_controller_1.default(new faqs_service_1.default(db), new user_service_1.default(db), new user_types_service_1.default(db), new unanswered_service_1.default(db));
    const userController = new user_crud_controller_1.default(new user_service_1.default(db));
    // Most popular FAQ
    api.get('/popular', middlewares_1.hasRole([user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin]), adminController.getMostPopularFaqs);
    // Get all unanswered questions
    api.get('/unanswered', middlewares_1.hasRole([user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin]), adminController.getUnanswered);
    // Get total number of users
    api.get('/count', middlewares_1.hasRole([user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin]), userController.countAllUsers);
    // Get total users by group(type)
    api.get('/count/:typeId', middlewares_1.hasRole([user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin]), userController.countByType);
    // Put faculty answer
    api.put('/faculty', middlewares_1.hasRole([user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin]), adminController.editFacultyInfo);
    // Put university answer
    api.put('/university', middlewares_1.hasRole([user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin]), adminController.editUniversityInfo);
    // Put contacts answer
    api.put('/contacts', middlewares_1.hasRole([user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin]), adminController.editContactsInfo);
    // Get all categories
    api.get('/categories', middlewares_1.hasRole([user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin]), adminController.getAllUserTypes);
    // Create new user category
    api.post('/categories', middlewares_1.hasRole([user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin]), adminController.addNewType);
    // Get all faqs
    api.get('/faqs', middlewares_1.hasRole([user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin]), adminController.refreshFaqs);
    // Get users by category
    api.get('/categories/:typeId', middlewares_1.hasRole([user_role_model_1.Role.admin, user_role_model_1.Role.superAdmin]), adminController.selectUsersByCategory);
    return api;
}
exports.default = adminStats;
//# sourceMappingURL=admin.route.js.map