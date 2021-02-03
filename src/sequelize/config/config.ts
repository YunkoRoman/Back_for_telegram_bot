import dotenv from 'dotenv';

dotenv.config();

interface Params {
  [key:string]: Object;
}

const config: Params = {
  development: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV,
    host: '127.0.0.1',
    url: process.env.DATABASE_URL,
    port: process.env.DB_PORT_DEV,
    dialect: process.env.DB_DIALECT_DEV,
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
      ssl: true,
    },
    dialect: 'postgres',
  },
};

export default config;
