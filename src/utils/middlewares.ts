import { Request, Response, NextFunction } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import logger from './logger';
import { apiResponse, failedResponse } from './response';
import { isValidTelegramId } from './validator';

// eslint-disable-next-line import/prefer-default-export
export function validateTelegramId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validationErrors = isValidTelegramId(res.header('X-User-id'));
  if (validationErrors.length === 0) {
    next();
  } else {
    apiResponse(res, failedResponse(validationErrors), StatusCodes.BAD_REQUEST);
  }
}
