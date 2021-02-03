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
    api.get('/', userController.getAllUsers);
    return api;
}
exports.default = usersRoute;
//# sourceMappingURL=users.route.js.map