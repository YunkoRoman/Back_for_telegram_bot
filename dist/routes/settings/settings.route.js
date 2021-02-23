"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settings_controller_1 = __importDefault(require("../../controllers/settings.controller"));
const settings_service_1 = __importDefault(require("../../services/settings.service"));
const middlewares_1 = require("../../utils/middlewares");
function settingsRoute(db) {
    const api = express_1.default.Router();
    const settingsController = new settings_controller_1.default(new settings_service_1.default(db));
    // ========== CRUD ====================
    // GET all settings
    api.get("/", settingsController.getAllSettings);
    // CREATE param
    api.post("/", settingsController.createSetting);
    // Edit value
    api.put("/:id", middlewares_1.check_idMiddleware, settingsController.udpdateById);
    // Remove value
    api.delete("/", settingsController.deleteValue);
    return api;
}
exports.default = settingsRoute;
//# sourceMappingURL=settings.route.js.map