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
class UserRolesService {
    // eslint-disable-next-line no-shadow
    constructor(db) {
        // ============ CRUD ==============
        this.getAllRoles = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.Roles.findAll();
            return result;
        });
        this.updateRoleById = (userRole) => __awaiter(this, void 0, void 0, function* () {
            yield this.DB.Roles.update(userRole, { where: { id: userRole.id } });
        });
        this.DB = db;
    }
}
exports.default = UserRolesService;
//# sourceMappingURL=user.roles.service.js.map