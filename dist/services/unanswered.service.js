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
const sequelize_1 = require("sequelize");
class UnansweredService {
    // eslint-disable-next-line no-shadow
    constructor(db) {
        // ============ CRUD ==============
        this.getAllUnanswered = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.UnanswdQuestions.findAll();
            return result;
        });
        this.getUnansweredById = (unansweredId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.UnanswdQuestions.findOne({ where: { id: unansweredId } });
            return result;
        });
        this.getUnansweredByQuestion = (unansweredQuestion) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.UnanswdQuestions.findAll({
                where: {
                    question: {
                        [sequelize_1.Op.like]: unansweredQuestion,
                    },
                },
            });
            return result;
        });
        this.addNewUnanswered = (unanswered) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.UnanswdQuestions.create(unanswered);
            return result;
        });
        this.updateUnansweredById = (unanswered) => __awaiter(this, void 0, void 0, function* () {
            yield this.DB.UnanswdQuestions.update(unanswered, { where: { id: unanswered.id } });
        });
        this.deleteUnansweredById = (unansweredId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.UnanswdQuestions.destroy({ where: { id: unansweredId } });
            return result;
        });
        this.DB = db;
    }
}
exports.default = UnansweredService;
//# sourceMappingURL=unanswered.service.js.map