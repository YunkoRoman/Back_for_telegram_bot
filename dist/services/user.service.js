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
        this.findAndCountAll = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findAndCountAll();
            return result;
        });
        this.findAndCountByType = (idOfType) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findAndCountAll({
                where: { typeId: idOfType },
            });
            return result;
        });
        // =============== CRUD =================
        this.getUserById = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findAll({
                where: {
                    telegramId: {
                        [sequelize_1.Op.eq]: userId,
                    },
                },
            });
            return result;
        });
        this.getAllUsersByType = (typeId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findAll({ where: { typeId } });
            return result;
        });
        this.getAllUsersByRole = (roleId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findAll({ where: { roleId } });
            return result;
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.create(user);
            return result;
        });
        this.updateUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.update(user, {
                where: {
                    telegramId: {
                        [sequelize_1.Op.eq]: user.telegramId,
                    },
                },
            });
            return result;
        });
        this.deleteUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.destroy({ where: { telegramId: userId } });
            return result;
        });
        this.DB = db;
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map