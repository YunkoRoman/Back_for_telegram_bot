/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { UserAddToChat } from 'types/types';
import { UserModel } from 'sequelize/models/user.model';
import { apiResponse, failedResponse, successResponse } from '../utils/response';
import logger from '../utils/logger';
import UserService from '../services/user.service';
import { RedisClient, createClient } from 'redis';
import dotenv from 'dotenv';
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
      // const cachedResult = await this.redisUserCache.getUser(telegramId);
      // console.log('cached result: ', cachedResult);
      const result = await this.userService.getUserById(telegramId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('error while getting user by id', { meta: { ...error } });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public createNewUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const user: UserAddToChat = req.body;
    user.roleId = 1;
    user.typeId = 1;
    try {
      logger.info('save new user');
      const result = await this.userService.createUser(user);
      console.log('CREATE RESULT: ', JSON.stringify(result));
      console.log('before redis');
      const createdUser = await this.redisUserCache.setUser(result);
      // this.redisUserCache.getUser(result.telegramId).then((res) => {
      //   console.log('getUsers:', res);
      // });
      const getUserRedis = await this.redisUserCache.getUser(result.telegramId);
      console.log('createdUser: ', createdUser);
      console.log('getUserRedis: ', getUserRedis);
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
      // console.log('CREATE RESULT: ', result);
      console.log('before redis');
      await this.redisUserCache.setUser(result);
      console.log('after redis');
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
    const roleId = 2;
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
