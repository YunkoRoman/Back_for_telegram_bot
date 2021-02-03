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
class UserService {
    // eslint-disable-next-line no-shadow
    constructor(db) {
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findAll();
            return result;
        });
        this.getUserById = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findOne({ where: { id: userId } });
            return result;
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            yield this.DB.User.create(user);
        });
        this.updateUser = (user) => __awaiter(this, void 0, void 0, function* () {
            yield this.DB.User.update(user, {
                where: { [sequelize_1.Op.and]: { id: user.id } },
            });
        });
        this.deleteUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            yield this.DB.User.destroy({ where: { id: userId } });
        });
        this.DB = db;
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map