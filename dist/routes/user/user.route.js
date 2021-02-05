"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = __importDefault(require("../../services/user.service"));
const user_crud_controller_1 = __importDefault(require("../../controllers/user.crud.controller"));
function usersRoute(db) {
    const api = express_1.default.Router();
    const userController = new user_crud_controller_1.default(new user_service_1.default(db));
    // ========== CRUD ====================
    // GET all users
    api.get('/admins', userController.getAllAdmins);
    // api.get('/', userController.getAllUsers);
    // GET all admins
    // GET user by id
    api.get('/:telegramId', userController.getUserById);
    api.get('/admins', userController.getAllAdmins);
    // CREATE new user
    api.post('/', userController.createNewUser);
    // UPDATE user
    api.put('/:telegramId', userController.updateUserById);
    // DELETE user by ID
    api.delete('/:telegramId', userController.deleteUser);
    return api;
}
exports.default = usersRoute;
//# sourceMappingURL=user.route.js.map