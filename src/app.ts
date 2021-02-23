import express, { NextFunction, Request, Response } from 'express';
import bodyparser from 'body-parser';
import {
  StatusCodes,
  getReasonPhrase,
} from 'http-status-codes';
import { logger } from './utils/logger';
import users from './routes/user/user.route';
import admin from './routes/admin/admin.route';
import info from './routes/faqs/faqs.route';
import { db } from './sequelize/models/index';
import { Role } from './sequelize/models/user.role.model';
import { hasRole } from './utils/middlewares';

export default function appFunc() {
  const app = express();

  db.sequelize.authenticate().then(() => logger.serverLogger.info('Authenticated'));

  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  // eslint-disable-next-line no-unused-vars
  app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    logger.serverLogger.error(`Server error ${err.message}  CODE ${err.code}`);
    res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        code: err.code,
      });
  });
  app.use('/users', users(db));

  app.use('/admin', hasRole([Role.admin, Role.superAdmin]), admin(db));

  app.use('/info', info(db));

  return app;
}
