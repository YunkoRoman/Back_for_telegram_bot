"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFaq = exports.Faq = void 0;
const sequelize_1 = require("sequelize");
class Faq extends sequelize_1.Model {
}
exports.Faq = Faq;
function initFaq(sequelize) {
    return sequelize.define('chat_bot_faq', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        question: new sequelize_1.DataTypes.STRING(128),
        answer: new sequelize_1.DataTypes.STRING(128),
        stats: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
    });
}
exports.initFaq = initFaq;
//# sourceMappingURL=faq.model.js.map