"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SettingsService {
    // eslint-disable-next-line no-shadow
    constructor(db) {
        // ============ CRUD ==============
        this.getAllSettings = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Settings.findAll();
            return result;
        });
        this.createSetting = (setting) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Settings.create(setting);
            return result;
        });
        this.updateSetting = (setting) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Settings.update(setting, {
                where: {
                    id: setting.id,
                },
            });
            return result;
        });
        this.deleteValue = (valueToDelete) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Settings.destroy({
                where: {
                    value: valueToDelete,
                },
            });
            return result;
        });
        this.DB = db;
    }
}
exports.default = SettingsService;
//# sourceMappingURL=settings.service.js.map