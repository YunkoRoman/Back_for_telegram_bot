import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BuildOptions,
} from 'sequelize';

export enum Role {
  regular = 'regular',
  admin = 'admin',
  superAdmin = 'superAdmin'
}

export interface UserRoleAttributes {
  id: number;
  role: Role;
}
export interface UserRoleCreationAttributes extends Optional<UserRoleAttributes, 'id'> {}

export interface UserRoleModel extends Model<UserRoleAttributes>, UserRoleAttributes {}

export type UserRoleStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserRoleModel;
};

export class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes>
  implements UserRoleAttributes {
    public id!: number;

    public role!: Role;
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
