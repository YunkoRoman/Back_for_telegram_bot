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
  Config,
} from 'sequelize';

import { initUser, UserStatic } from './user.model';
import { initRole, UserRoleStatic } from './user.role.model';
import { initUserType, UserTypeStatic } from './user.type';
import config from '../config/config';

export interface DB {
  sequelize: Sequelize;
  User: UserStatic;
  Roles: UserRoleStatic;
  Types: UserTypeStatic;
}

const env = process.env.NODE_ENV || 'development';

const params: any = config[env];

const sequelize = new Sequelize(params.database, params.username, params.password, params);

const User = initUser(sequelize);
const Roles = initRole(sequelize);
const Types = initUserType(sequelize);

User.belongsTo(Roles);
User.belongsTo(Types);
export const db: DB = {
  sequelize,
  User,
  Roles,
  Types,
};
