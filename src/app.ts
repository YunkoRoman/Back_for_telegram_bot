import express from 'express';
import bodyparser from 'body-parser';
import users from './routes/users.route';
import { db } from './sequelize/models/index';

export default function appFunc() {
  const app = express();

  db.sequelize.authenticate();

  app.use(bodyparser.json());

  app.use('/users', users(db));

  return app;
}
