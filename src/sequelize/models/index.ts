import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from 'sequelize';
// eslint-disable-next-line import/no-cycle
import { initUser } from './user.model';
import { initRole } from './user.role.model';
import { initUserType } from './user.type';

export interface DB {
  sequelize: Sequelize;
}

const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/config.json`)[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = initUser(sequelize);
const Roles = initRole(sequelize);
const Types = initUserType(sequelize);

User.belongsToMany(Roles, { through: 'chat_bot_users_has_roles' });
Roles.belongsToMany(User, { through: 'chat_bot_users_has_roles' });
Types.belongsTo(User);

export const db: DB = {
  sequelize,
};
