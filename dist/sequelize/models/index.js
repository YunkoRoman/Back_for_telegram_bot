"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("./user.model");
const user_role_model_1 = require("./user.role.model");
const user_type_model_1 = require("./user.type.model");
const config_1 = __importDefault(require("../config/config"));
const faq_model_1 = require("./faq.model");
const unanswered_questions_model_1 = require("./unanswered.questions.model");
const settings_model_1 = require("./settings.model");
dotenv_1.default.config();
const env = process.env.NODE_ENV || 'production';
const params = config_1.default[env];
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL || params.url);
// const sequelize = new Sequelize(params.database, params.username, params.password, params);
const User = user_model_1.initUser(sequelize);
const Roles = user_role_model_1.initRole(sequelize);
const Types = user_type_model_1.initUserType(sequelize);
const Faqs = faq_model_1.initFaq(sequelize);
const UnanswdQuestions = unanswered_questions_model_1.initUnansewredQuestions(sequelize);
const Settings = settings_model_1.initSettings(sequelize);
Roles.hasMany(User, {
    sourceKey: 'id',
    foreignKey: 'roleId',
    as: 'users',
});
// User.belongsTo(Roles);
Types.hasMany(User, {
    sourceKey: 'id',
    foreignKey: 'typeId',
    as: 'types',
});
// User.belongsTo(Types);
exports.db = {
    sequelize,
    User,
    Roles,
    Types,
    Faqs,
    UnanswdQuestions,
    Settings,
};
//# sourceMappingURL=index.js.map