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
        this.getStatsOfAllUsersByType = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findAll({
                where: {
                    typeId: {
                        // [Op.or]: ['Applicant', 'Parents', 'Teacher', 'Student', 'Other'],
                        [sequelize_1.Op.not]: null,
                    },
                },
            });
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
            const result = yield this.DB.User.findOne({
                where: {
                    telegramId: {
                        [sequelize_1.Op.eq]: userId,
                    },
                },
            });
            return result;
        });
        this.getAllUsersByTelName = (telName) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findAll({
                where: {
                    telegramName: {
                        [sequelize_1.Op.like]: telName,
                    },
                },
            });
            return result;
        });
        this.getAllUsersByName = (userName) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findAll({
                where: {
                    name: {
                        [sequelize_1.Op.like]: userName,
                    },
                },
            });
            return result;
        });
        this.getAllUsersByCity = (userCity) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findAll({
                where: {
                    city: {
                        [sequelize_1.Op.like]: userCity,
                    },
                },
            });
            return result;
        });
        this.getAllUsersByPhone = (phone) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.DB.User.findAll({
                where: {
                    phoneNumber: {
                        [sequelize_1.Op.like]: phone,
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
                returning: true,
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