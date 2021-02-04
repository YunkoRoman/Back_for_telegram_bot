import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BuildOptions,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
} from 'sequelize';
import { User } from './user.model';

// eslint-disable-next-line no-shadow
export enum Role {
  // eslint-disable-next-line no-unused-vars
  regular = 'regular',
  // eslint-disable-next-line no-unused-vars
  admin = 'admin',
  // eslint-disable-next-line no-unused-vars
  superAdmin = 'superAdmin'
}

export interface UserRoleAttributes {
  id: number;
  role: Role;
}
export interface UserRoleCreationAttributes extends Optional<UserRoleAttributes, 'id'> {}

export interface UserRoleModel extends Model<UserRoleAttributes>, UserRoleAttributes {}

export type UserRoleStatic = typeof Model & {
  // eslint-disable-next-line no-unused-vars
  new (values?: object, options?: BuildOptions): UserRoleModel;
};

export class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes>
  implements UserRoleAttributes {
    public id!: number;

    public role!: Role;

    public getUsers!: HasManyGetAssociationsMixin<User>; // Note the null assertions!

    public addUser!: HasManyAddAssociationMixin<User, number>;

    public hasUser!: HasManyHasAssociationMixin<User, number>;

    public countUsers!: HasManyCountAssociationsMixin;

    public createUser!: HasManyCreateAssociationMixin<User>;

    public readonly users?: User[];

    public static associations: {
      users: Association<UserRole, User>;
  };
}

export function initRole(sequelize: Sequelize) {
  return <UserRoleStatic>sequelize.define('chat_bot_roles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: DataTypes.ENUM(Role.regular, Role.admin, Role.superAdmin),
  });
}
