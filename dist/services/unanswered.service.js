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
class UnansweredService {
    // eslint-disable-next-line no-shadow
    constructor(db) {
        this.getMostPopular = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.UnanswdQuestions.findAll({
                order: [['stats', 'DESC']],
                limit: 10,
            });
            return result;
        });
        // ============ CRUD ==============
        this.getAllUnanswered = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.UnanswdQuestions.findAll();
            return result;
        });
        this.getUnansweredById = (UnansweredId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.UnanswdQuestions.findOne({ where: { id: UnansweredId } });
            return result;
        });
        this.addNewUnanswered = (Unanswered) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.UnanswdQuestions.create(Unanswered);
            return result;
        });
        this.updateUnansweredById = (Unanswered) => __awaiter(this, void 0, void 0, function* () {
            yield this.DB.UnanswdQuestions.update(Unanswered, { where: { id: Unanswered.id } });
        });
        this.deleteUnansweredById = (UnansweredId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.UnanswdQuestions.destroy({ where: { id: UnansweredId } });
            return result;
        });
        this.DB = db;
    }
}
exports.default = UnansweredService;
//# sourceMappingURL=unanswered.service.js.map