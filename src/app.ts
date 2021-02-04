import express from 'express';
import bodyparser from 'body-parser';
import users from './routes/user.crud.route';
import { db } from './sequelize/models/index';

export default function appFunc() {
  const app = express();

  db.sequelize.authenticate().then(() => console.log('Authenticated'));
  // db.sequelize.sync({ force: true });

  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.use('/users', users(db));

  return app;
}
