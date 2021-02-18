/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { UserAddToChat } from 'types/types';
import { UserModel } from '../sequelize/models/user.model';
import { apiResponse, failedResponse, successResponse } from '../utils/response';
import { logger } from '../utils/logger';
import UserService from '../services/user.service';
import { Role } from '../sequelize/models/user.role.model';
import RedisUser from '../cache/redisUser';

export default class UserController {
  public userService: UserService;

  private redisUserCache: RedisUser;

  constructor(userService: UserService) {
    this.userService = userService;
    this.redisUserCache = new RedisUser();
  }

  public getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      logger.userLogger.info('get all users');
      const users = await this.userService.getAllUsers();
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error while getting all users', {
        meta: { ...error },
      });
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const { telegramId } = req.params;
    try {
      logger.userLogger.info('find user by id');
      console.log('redis get start');
      const getUserRedis = await this.redisUserCache.getUser(telegramId);
      if (getUserRedis !== null) {
        logger.userLogger.info('getUserRedis: ', getUserRedis);
        return apiResponse(res, successResponse(getUserRedis), StatusCodes.OK);
      }
      logger.userLogger.info('redis get end');
      logger.userLogger.info('ORM START CHECKPOINT');
      const result = await this.userService.getUserById(telegramId);
      if (result.length > 0) {
        const createdUser = await this.redisUserCache.setUser(result[0] as UserAddToChat);
        logger.userLogger.info('createdUser: ', createdUser);
      }
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error while getting user by id', { meta: { ...error } });
      next(error);
    }
  };

  public createNewUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const user: UserAddToChat = req.body;
    user.roleId = Role.regular;
    try {
      // todo error hendler for empty object

      console.log(user);
      logger.userLogger.info('save new user');
      const result = await this.userService.createUser(user);
      const createdUser = await this.redisUserCache.setUser(result);
      logger.userLogger.info('createdUser: ', createdUser);
      return apiResponse(res, successResponse(result), StatusCodes.CREATED);
    } catch (error) {
      logger.userLogger.error('error while saving user', { meta: { ...error } });
      next(error);
    }
  };

  // todo super admin could not update himself
  public updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const user: UserAddToChat = {
      ...req.body,
      telegramId: req.params.telegramId,
    };
    console.log(req.params);
    try {
      logger.userLogger.info('update user by id');
      const result = await this.userService.updateUser(user);
      if (result) {
        if (result[0] !== 0) {
          const updatedUser = await this.redisUserCache.setUser(result[1][0] as UserAddToChat);
          logger.userLogger.info(`updatedUser: ${updatedUser}`);
        }
      }
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error while updating user', {
        meta: { ...error },
      });
      next(error);
    }
  };

  public countAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      logger.userLogger.info('count all users');
      const result = await this.userService.findAndCountAll();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error while counting users', { meta: { ...error } });
      next(error);
    }
  };

  public countByType = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const { typeId } = req.params;
    try {
      logger.userLogger.info('count all users');
      const result = await this.userService.findAndCountByType(parseInt(typeId, 10));
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error while counting users by type', { meta: { ...error } });
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const { id, telegramId } = req.params;
    try {
      logger.userLogger.info('delete user by id');
      const result = await this.userService.deleteUser(telegramId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error while deleting user', { meta: { ...error } });
      next(error);
    }
  };

  public getAllAdmins = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const roleId = Role.admin;
    try {
      logger.userLogger.info('get all admins');
      const users = await this.userService.getAllUsersByRole(roleId);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error while getting all admins', {
        meta: { ...error },
      });
      next(error);
    }
  };

  public getUserByTelegramName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> => {
    const { telegramName } = req.params;
    try {
      const users = await this.userService.getAllUsersByTelName(telegramName);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error getting users by telegram name', { meta: { ...error } });
      next(error);
    }
  };

  public getUserByPhone = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> => {
    const { phone } = req.params;
    try {
      const users = await this.userService.getAllUsersByPhone(phone);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error getting users by phone', { meta: { ...error } });
      next(error);
    }
  };

  public getUserByCity = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> => {
    const { city } = req.params;
    try {
      const users = await this.userService.getAllUsersByCity(city);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error getting users by telegram city', { meta: { ...error } });
      next(error);
    }
  };

  public getUserByName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> => {
    const { name } = req.params;
    try {
      const users = await this.userService.getAllUsersByName(name);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error getting users by telegram name', { meta: { ...error } });
      next(error);
    }
  };

  public getUserByRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> => {
    const { role } = req.params;
    try {
      const users = await this.userService.getAllUsersByRole(parseInt(role, 10));
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error getting users by role', { meta: { ...error } });
      next(error);
    }
  };

  public getUserByType = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> => {
    const { type } = req.params;
    try {
      const users = await this.userService.getAllUsersByRole(parseInt(type, 10));
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error('error getting users by type', { meta: { ...error } });
      next(error);
    }
  };
}
