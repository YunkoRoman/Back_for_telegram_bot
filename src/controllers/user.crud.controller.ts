/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { UserAddToChat } from 'types/types';
import { UserModel } from '../sequelize/models/user.model';
import { apiResponse, failedResponse, successResponse } from '../utils/response';
import logger from '../utils/logger';
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

  public getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      logger.info('get all users');
      const users = await this.userService.getAllUsers();
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.error('error while getting all users', {
        meta: { ...error },
      });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { telegramId } = req.params;
    try {
      logger.info('find user by id');
      console.log('redis get start');
      const getUserRedis = await this.redisUserCache.getUser(telegramId);
      if (getUserRedis !== null) {
        console.log('getUserRedis: ', getUserRedis);
        return apiResponse(res, successResponse(getUserRedis), StatusCodes.OK);
      }
      console.log('redis get end');
      console.log('ORM START CHECKPOINT');
      const result = await this.userService.getUserById(telegramId);
      if (result !== null) {
        const createdUser = await this.redisUserCache.setUser(result[0] as UserAddToChat);
        console.log('createdUser: ', createdUser);
        return apiResponse(res, successResponse(result), StatusCodes.OK);
      } else {
        return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.NOT_FOUND)), StatusCodes.NOT_FOUND);
      }
    } catch (error) {
      logger.error('error while getting user by id', { meta: { ...error } });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public createNewUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const user: UserAddToChat = req.body;
    user.roleId = Role.regular;
    user.typeId = 1;
    try {
      logger.info('save new user');
      const result = await this.userService.createUser(user);
      const createdUser = await this.redisUserCache.setUser(result);
      console.log('createdUser: ', createdUser);
      return apiResponse(res, successResponse(result), StatusCodes.CREATED);
    } catch (error) {
      logger.error('error while saving user', { meta: { ...error } });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const user: UserAddToChat = {
      ...req.body,
      telegramId: req.params.telegramId,
    };
    try {
      logger.info('update user by id');
      const result = await this.userService.updateUser(user);
      if (result) {
        if (result !== null) {
          const updatedUser = await this.redisUserCache.setUser(result[1][0] as UserAddToChat);
          console.log('updatedUser: ', updatedUser);
        }
      }
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('error while updating user');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public countAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      logger.info('count all users');
      const result = await this.userService.findAndCountAll();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('error while counting users', { meta: { ...error } });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public countByType = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { typeId } = req.params;
    try {
      logger.info('count all users');
      const result = await this.userService.findAndCountByType(parseInt(typeId, 10));
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('error while counting users by type', { meta: { ...error } });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id, telegramId } = req.params;
    try {
      logger.info('delete user by id');
      const result = await this.userService.deleteUser(telegramId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('error while deleting user', { meta: { ...error } });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getAllAdmins = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const roleId = Role.admin;
    try {
      logger.info('get all admins');
      const users = await this.userService.getAllUsersByRole(roleId);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.error('error while getting all admins', {
        meta: { ...error },
      });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
}
