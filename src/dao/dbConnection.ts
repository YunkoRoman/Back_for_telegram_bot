import dotenv from 'dotenv';

import { Sequelize } from 'sequelize';

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export const sequelize = new Sequelize(process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

// Connection test
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
