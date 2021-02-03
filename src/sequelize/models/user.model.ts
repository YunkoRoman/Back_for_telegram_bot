import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BuildOptions,
} from 'sequelize';

export interface UserAttributes {
  id: number;
  telegramId: string;
  telegramName: string | null;
  name: string;
  phoneNumber: string | null;
  city: string;
  step: JSON
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;

    public telegramId!: string;

    public telegramName!: string | null;

    public name!: string;

    public phoneNumber!: string | null;

    public city!: string;

    public step!: JSON;
}

export function initUser(sequelize: Sequelize) {
  return <UserStatic>sequelize.define('chat_bot_users',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      telegramId: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      telegramName: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      phoneNumber: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      city: {
        type: new DataTypes.STRING(128),
      },
      step: {
        type: DataTypes.JSON,
      },
    });
}
