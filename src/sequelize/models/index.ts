import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { initUser, UserStatic } from './user.model';
import { initRole, UserRoleStatic } from './user.role.model';
import { initUserType, UserTypeStatic } from './user.type.model';
import config from '../config/config';
import { FaqStatic, initFaq } from './faq.model';
import { initUnansewredQuestions, UnanswdQuestionStatic } from './unanswered.questions.model';
import { initSettings, SettingsStatic } from './settings.model';

export interface DB {
  sequelize: Sequelize;
  User: UserStatic;
  Roles: UserRoleStatic;
  Types: UserTypeStatic;
  Faqs: FaqStatic;
  UnanswdQuestions: UnanswdQuestionStatic;
  Settings: SettingsStatic;
}
dotenv.config();
const env = process.env.NODE_ENV || 'production';

const params: any = config[env];

const sequelize = new Sequelize(process.env.DATABASE_URL || params.url);
// const sequelize = new Sequelize(params.database, params.username, params.password, params);

const User = initUser(sequelize);
const Roles = initRole(sequelize);
const Types = initUserType(sequelize);
const Faqs = initFaq(sequelize);
const UnanswdQuestions = initUnansewredQuestions(sequelize);
const Settings = initSettings(sequelize);

Roles.hasMany(User, {
  sourceKey: 'id',
  foreignKey: 'roleId',
  as: 'users', // this determines the name in `associations`!
});

// User.belongsTo(Roles);

Types.hasMany(User, {
  sourceKey: 'id',
  foreignKey: 'typeId',
  as: 'types',
});

// User.belongsTo(Types);

export const db: DB = {
  sequelize,
  User,
  Roles,
  Types,
  Faqs,
  UnanswdQuestions,
  Settings,
};
