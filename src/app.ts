import express from 'express';
import bodyparser from 'body-parser';
import logger from './utils/logger';
import users from './routes/user/user.route';
import admin from './routes/admin/admin.route';
import info from './routes/faqs/faqs.route';
import { db } from './sequelize/models/index';

export default function appFunc() {
  const app = express();

  db.sequelize.authenticate().then(() => logger.info('Authenticated'));

  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.use('/users', users(db));

  app.use('/admin', admin(db));

  app.use('/info', info(db));

  return app;
}
