"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSettings = exports.Settings = void 0;
const sequelize_1 = require("sequelize");
class Settings extends sequelize_1.Model {
}
exports.Settings = Settings;
function initSettings(sequelize) {
    return sequelize.define('chat_bot_settings', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        value: new sequelize_1.DataTypes.STRING(128),
    });
}
exports.initSettings = initSettings;
//# sourceMappingURL=settings.model.js.map