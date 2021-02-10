/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import {
  getReasonPhrase, StatusCodes,
} from 'http-status-codes';
import { UserAddToChat } from 'types/types';
import { UserModel } from '../sequelize/models/user.model';
import { apiResponse, failedResponse, successResponse } from '../utils/response';
import logger from '../utils/logger';
import UserService from '../services/user.service';
import { Role } from '../sequelize/models/user.role.model';

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

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response> => {
    const { telegramId } = req.params;
    try {
      logger.info('find user by id');
      const result = await this.userService.getUserById(telegramId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('error while getting user by id', { meta: { ...error } });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
        StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public createNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response> => {
    const user: UserAddToChat = req.body;
    user.roleId = Role.regular;
    user.typeId = 1;
    try {
      logger.info('save new user');
      const result = await this.userService.createUser(user);
      return apiResponse(res, successResponse(result), StatusCodes.CREATED);
    } catch (error) {
      logger.error('error while saving user', { meta: { ...error } });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
        StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public updateUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ):Promise<Response> => {
    const user: UserAddToChat = {
      ...req.body,
      telegramId: req.params.telegramId,
    };
    try {
      logger.info('update user by id');
      const result = await this.userService.updateUser(user);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('error while updating user');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
        StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public countAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response> => {
    try {
      logger.info('count all users');
      const result = await this.userService.findAndCountAll();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('error while counting users', { meta: { ...error } });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
        StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public countByType = async (
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response> => {
    const { typeId } = req.params;
    try {
      logger.info('count all users');
      const result = await this.userService.findAndCountByType(parseInt(typeId, 10));
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('error while counting users by type', { meta: { ...error } });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
        StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response> => {
    const { id, telegramId } = req.params;
    try {
      logger.info('delete user by id');
      const result = await this.userService.deleteUser(telegramId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('error while deleting user', { meta: { ...error } });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)),
        StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public getAllAdmins = async (
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response> => {
    const roleId = Role.admin;
    try {
      logger.info('get all admins');
      const users = await this.userService.getAllUsersByRole(roleId);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.error('error while getting all admins', {
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
