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
        intentName: {
            type: new sequelize_1.DataTypes.TEXT('long'),
            unique: true,
        },
        question: {
            type: new sequelize_1.DataTypes.TEXT('long'),
            unique: true,
        },
        answer: new sequelize_1.DataTypes.TEXT('long'),
        stats: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
        pointer: {
            type: new sequelize_1.DataTypes.STRING(32),
            allowNull: true,
        },
        step: {
            type: sequelize_1.DataTypes.JSON,
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['intentName', 'question'],
            },
        ],
    });
}
exports.initFaq = initFaq;
//# sourceMappingURL=faq.model.js.map