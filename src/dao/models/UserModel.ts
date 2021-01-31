import { UserRole } from 'interfaces/user-interface';
import { DataTypes, Model } from 'sequelize/types';
import { sequelize } from '../dbConnection';

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telegramName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telegramId: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.NUMBER,
  },
  city: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM,
    allowNull: false,
    defaultValue: UserRole.regular,
  },
  state: {
    type: DataTypes.JSONB,
  },

}, {
  sequelize, // We need to pass the connection instance
  modelName: 'Users', // We need to choose the model name
});
