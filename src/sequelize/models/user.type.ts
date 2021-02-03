import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BuildOptions,
} from 'sequelize';

export interface UserTypeAttributes {
  id: number;
  userType: string;
}

export interface UserTypeModel extends Model<UserTypeAttributes>, UserTypeAttributes {}

export type UserTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserTypeModel;
};

export interface UserTypeCreationAttributes extends Optional<UserTypeAttributes, 'id'> {}

export class UserRole extends Model<UserTypeAttributes, UserTypeCreationAttributes>
  implements UserTypeAttributes {
    public id!: number;

    public userType!: string;
}

export function initUserType(sequelize: Sequelize) {
  return <UserTypeStatic>sequelize.define('chat_bot_user_type', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userType: new DataTypes.STRING(128),
  });
}
