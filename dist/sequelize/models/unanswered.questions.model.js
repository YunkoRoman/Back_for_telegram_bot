"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUnansewredQuestions = exports.UnanswdQuestion = void 0;
const sequelize_1 = require("sequelize");
class UnanswdQuestion extends sequelize_1.Model {
}
exports.UnanswdQuestion = UnanswdQuestion;
function initUnansewredQuestions(sequelize) {
    return sequelize.define('chat_bot_unanswereds', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        question: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        stats: {
            type: sequelize_1.DataTypes.INTEGER,
        },
    });
}
exports.initUnansewredQuestions = initUnansewredQuestions;
//# sourceMappingURL=unanswered.questions.model.js.map