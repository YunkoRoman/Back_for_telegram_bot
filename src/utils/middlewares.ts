import { Request, Response, NextFunction } from "express";
import {
  StatusCodes
} from "http-status-codes";
import { Role } from "../sequelize/models/user.role.model";
import { logger } from "./logger";
import { apiResponse, failedResponse } from "./response";
import { invalidFields, isValidTelegramId } from "./validator";
import { db } from "../sequelize/models/index";
import { ErrorHandler } from "../errors/errorHandler";
import { customErrors } from "../errors/customErrors";

// eslint-disable-next-line import/prefer-default-export
export function hasRole(roles: Role[]) {
  return async function validateAdminTelegramId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const telegramIdFromHeader = req.header("X-User-id");
    logger.userLogger.info(telegramIdFromHeader);
    const validationErrors = isValidTelegramId(telegramIdFromHeader);
    if (validationErrors.length === 0) {
      try {
        const user = await db.User.findOne({ where: { telegramId: telegramIdFromHeader } });
        if (user !== null && roles.includes(user?.roleId)) {
          next();
        } else {

          logger.middlewarwLogger.error("Trying to access without sufficient rights");
          return next(new ErrorHandler(StatusCodes.FORBIDDEN, customErrors.FORBIDDEN.message));
        }
      } catch (err) {
        logger.middlewarwLogger.error("Internal server error");
        next(err);
      }
    } else {
      logger.userLogger.error("No id in header");
      return next(new ErrorHandler(StatusCodes.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TELEGRAM_ID.messageHeader));
    }
  };
}

export function check_idMiddleware(
  req: Request,
  res: Response,
  next: NextFunction) {
  const { telegramId, id } = req.params;
  let idForCheck: any;
  telegramId ? (idForCheck = telegramId) : (idForCheck = id);
  try {
    const validationErrors = isValidTelegramId(idForCheck);
    console.log(validationErrors);
    if (validationErrors.length === 0) {
      next();
    } else {
      logger.middlewarwLogger.error(validationErrors, { Data: telegramId });
      return next(new ErrorHandler(StatusCodes.BAD_REQUEST, validationErrors[0]));

    }
  } catch (error) {
    logger.userLogger.error("No telegram_id in params");
    next(error);
  }


}

export function validateUserFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = invalidFields(req.body);
  if (errors.length > 0) {
    logger.userLogger.error("Field validation failed", { meta: errors });

    return next(new ErrorHandler(StatusCodes.BAD_REQUEST, `${errors}`));
  } else {
    next();
  }
}
