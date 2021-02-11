import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BuildOptions,
} from 'sequelize';

export interface SettingsAttributes {
  id: number;
  value: string;
}

export interface SettingsModel extends Model<SettingsAttributes>, SettingsAttributes {}

export type SettingsStatic = typeof Model & {
  // eslint-disable-next-line no-unused-vars
  new (values?: object, options?: BuildOptions): SettingsModel;
};

export interface SettingsCreationAttributes extends Optional<SettingsAttributes, 'id'> {}

export class Settings extends Model<SettingsAttributes, SettingsCreationAttributes>
  implements SettingsAttributes {
    public id!: number;

    public value!: string;
}

export function initSettings(sequelize: Sequelize) {
  return <SettingsStatic>sequelize.define('chat_bot_settings', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: new DataTypes.STRING(128),
  });
}
