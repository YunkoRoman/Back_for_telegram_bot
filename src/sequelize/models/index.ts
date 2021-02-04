import {
  Sequelize,
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

// const sequelize = new Sequelize(process.env.DATABASE_URL || params.url);
const sequelize = new Sequelize(params.database, params.username, params.password, params);

const User = initUser(sequelize);
const Roles = initRole(sequelize);
const Types = initUserType(sequelize);

Roles.hasMany(User, {
  sourceKey: 'id',
  foreignKey: 'roleId',
  as: 'users', // this determines the name in `associations`!
});

Types.hasMany(User, {
  sourceKey: 'id',
  foreignKey: 'typeId',
  as: 'types',
});

export const db: DB = {
  sequelize,
  User,
  Roles,
  Types,
};
