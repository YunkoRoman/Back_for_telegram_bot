import { Request, Response, NextFunction } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import { Role } from '../sequelize/models/user.role.model';
import logger from './logger';
import { apiResponse, failedResponse } from './response';
import { invalidFields, isValidTelegramId } from './validator';
import { db } from '../sequelize/models/index';

// eslint-disable-next-line import/prefer-default-export
export function hasRole(roles: Role[]) {
  return async function validateAdminTelegramId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const telegramIdFromHeader = req.header('X-User-id');
    logger.info(telegramIdFromHeader);
    const validationErrors = isValidTelegramId(telegramIdFromHeader);
    if (validationErrors.length === 0) {
      try {
        const user = await db.User.findOne({ where: { telegramId: telegramIdFromHeader } });
        if (user !== null && roles.includes(user?.roleId)) {
          next();
        } else {
          const error: string = 'You do not have enough rights';
          logger.error('Trying to access without sufficient rights');
          apiResponse(res, failedResponse(error), StatusCodes.BAD_REQUEST);
        }
      } catch (err) {
        logger.error('Internall server error');
        throw err;
      }
    } else {
      logger.error('No id in header');
      apiResponse(res, failedResponse(validationErrors), StatusCodes.BAD_REQUEST);
    }
  };
}

export function validateUserFields(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = invalidFields(req.body);
  if (errors.length > 0) {
    logger.error('Field validation failed');
    apiResponse(res, failedResponse(errors), StatusCodes.BAD_REQUEST);
  } else {
    next();
  }
}
