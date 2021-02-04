require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: 'Daria2014!',
    database: 'bot_test',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    dialect: process.env.DB_DIALECT,
  },
};
