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
class UserTypesService {
    // eslint-disable-next-line no-shadow
    constructor(db) {
        // ============ CRUD ==============
        this.getAllUserTypes = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Types.findAll();
            return result;
        });
        this.addNewUserType = (newType) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Types.create(newType);
            return result;
        });
        this.updateUserTypeById = (userType) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Types.update(userType, { where: { id: userType.id } });
            return result;
        });
        this.DB = db;
    }
}
exports.default = UserTypesService;
//# sourceMappingURL=user.types.service.js.map