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

export interface UserTypeAttributes {
  id: number;
  userType: string;
}

export interface UserTypeModel extends Model<UserTypeAttributes>, UserTypeAttributes {}

export type UserTypeStatic = typeof Model & {
  // eslint-disable-next-line no-unused-vars
  new (values?: object, options?: BuildOptions): UserTypeModel;
};

export interface UserTypeCreationAttributes extends Optional<UserTypeAttributes, 'id'> {}

export class UserRole extends Model<UserTypeAttributes, UserTypeCreationAttributes>
  implements UserTypeAttributes {
    public id!: number;

    public userType!: string;

    public getUsers!: HasManyGetAssociationsMixin<User>; // Note the null assertions!

    public addUser!: HasManyAddAssociationMixin<User, number>;

    public hasUser!: HasManyHasAssociationMixin<User, number>;

    public countUsers!: HasManyCountAssociationsMixin;

    public createUser!: HasManyCreateAssociationMixin<User>;

    public readonly users?: User[];

    public static associations: {
      users: Association<UserRole, User>;
    }
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
