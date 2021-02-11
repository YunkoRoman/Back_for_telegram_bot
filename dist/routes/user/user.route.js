"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = __importDefault(require("../../services/user.service"));
const user_crud_controller_1 = __importDefault(require("../../controllers/user.crud.controller"));
const middlewares_1 = require("../../utils/middlewares");
const user_role_model_1 = require("../../sequelize/models/user.role.model");
function usersRoute(db) {
    const api = express_1.default.Router();
    const userController = new user_crud_controller_1.default(new user_service_1.default(db));
    // ========== CRUD ====================
    // GET all admins
    api.get('/admins', middlewares_1.hasRole([user_role_model_1.Role.superAdmin]), userController.getAllAdmins);
    // Add admin
    api.put('/admins/:telegramId', [middlewares_1.hasRole([user_role_model_1.Role.superAdmin]), middlewares_1.validateUserFields], userController.updateUserById);
    // Remove admin
    api.put('/admins/remove/:telegramId', middlewares_1.hasRole([user_role_model_1.Role.superAdmin]), userController.updateUserById);
    // GET user by id
    api.get('/:telegramId', userController.getUserById);
    // CREATE new user
    api.post('/', [middlewares_1.validateUserFields], userController.createNewUser);
    // UPDATE user
    api.put('/:telegramId', [middlewares_1.validateUserFields], userController.updateUserById);
    // DELETE user by ID
    api.delete('/:telegramId', userController.deleteUser);
    return api;
}
exports.default = usersRoute;
//# sourceMappingURL=user.route.js.map