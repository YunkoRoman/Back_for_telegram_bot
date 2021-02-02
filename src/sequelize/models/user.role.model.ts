import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
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

export class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes>
  implements UserRoleAttributes {
    public id!: number;

    public role!: Role;
}

export function initRole(sequelize: Sequelize) {
  return sequelize.define('chat_bot_roles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: DataTypes.ENUM(Role.regular, Role.admin, Role.superAdmin),
  });
}
