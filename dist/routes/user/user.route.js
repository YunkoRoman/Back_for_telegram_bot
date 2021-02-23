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
    // Count all users by type
    api.get('/admins/countByTypes', middlewares_1.hasRole([user_role_model_1.Role.superAdmin]), userController.countAllUsersTypes);
    // Add admin
    api.put('/admins/:telegramId', [middlewares_1.hasRole([user_role_model_1.Role.superAdmin])], userController.updateUserById);
    // Remove admin
    api.put('/admins/remove/:telegramId', middlewares_1.hasRole([user_role_model_1.Role.superAdmin]), userController.updateUserById);
    // GET user by id
    api.get('/:telegramId', middlewares_1.check_idMiddleware, userController.getUserById);
    // GET users by telegram name
    api.get('/telegram_name/:telegramName', userController.getUserByTelegramName);
    // GET users by name
    api.get('/name/:name', userController.getUserByName);
    // GET users by phone
    api.get('/phone/:phone', userController.getUserByPhone);
    // GET user by city
    api.get('/city/:city', userController.getUserByCity);
    // GET user by role
    api.get('/role/:id', middlewares_1.check_idMiddleware, userController.getUserByRole);
    // GET user by type
    api.get('/type/:type', userController.getUserByType);
    // CREATE new user
    api.post('/', userController.createNewUser);
    // UPDATE user
    api.put('/:telegramId', middlewares_1.check_idMiddleware, userController.updateUserById);
    // DELETE user by ID
    api.delete('/:telegramId', middlewares_1.check_idMiddleware, userController.deleteUser);
    return api;
}
exports.default = usersRoute;
//# sourceMappingURL=user.route.js.map