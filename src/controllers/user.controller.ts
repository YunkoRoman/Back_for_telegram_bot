import { Request, Response, NextFunction } from 'express';
import {
  getReasonPhrase, StatusCodes,
} from 'http-status-codes';
import { apiResponse, failedResponse, successResponse } from '../utils/response';
import logger from '../utils/logger';
import UserService from '../services/user.service';

export default class UserController {
  public userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response> => {
    try {
      logger.info('get all users');
      const users = await this.userService.getAllUsers();
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.error('error while getting all users', {
        meta: { ...error },
      });
      return apiResponse(
        res,
        failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
