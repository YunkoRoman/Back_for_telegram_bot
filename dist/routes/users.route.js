"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = __importDefault(require("../services/user.service"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
function usersRoute(db) {
    const api = express_1.default.Router();
    const userController = new user_controller_1.default(new user_service_1.default(db));
    // GET all users
    api.get('/', userController.getAllUsers);
    // GET user by id
    api.get('/:id', userController.getUserById);
    // CREATE new user
    api.post('/', userController.createNewUser);
    // UPDATE user
    api.put('/:id', userController.updateUserById);
    // DELETE user by ID
    api.delete('/:id', userController.deleteUser);
    return api;
}
exports.default = usersRoute;
//# sourceMappingURL=users.route.js.map