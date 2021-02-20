/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { UserAddToChat } from "types/types";
import { apiResponse, failedResponse, successResponse } from "../utils/response";
import { logger } from "../utils/logger";
import UserService from "../services/user.service";
import { Role } from "../sequelize/models/user.role.model";
import RedisUser from "../cache/redisUser";
import { customErrors } from "../errors/customErrors";


export default class UserController {
  public userService: UserService;

  private redisUserCache: RedisUser;

  constructor(userService: UserService) {
    this.userService = userService;
    this.redisUserCache = new RedisUser();
  }

  public getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      logger.userLogger.info("get all users");
      const users = await this.userService.getAllUsers();
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error while getting all users", {
        Path: req.originalUrl,
        meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<Response> => {
    const { telegramId } = req.params;
    try {

      logger.userLogger.info("find user by id", { Data: telegramId });
      console.log("redis get start");
      const getUserRedis = await this.redisUserCache.getUser(telegramId);
      if (getUserRedis !== null) {
        logger.redisLogger.info("getUserRedis: ", { User: getUserRedis });
        return apiResponse(res, successResponse(getUserRedis), StatusCodes.OK);
      }
      logger.redisLogger.info("redis get end");
      logger.userLogger.info("ORM START CHECKPOINT");
      const result = await this.userService.getUserById(telegramId);
      if (getUserRedis !== null) {
        logger.userLogger.info("getUserRedis: ", getUserRedis);
        return apiResponse(res, successResponse(getUserRedis), StatusCodes.OK);
      }
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error while getting user by id", { Path: req.originalUrl, meta: { ...error } });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public createNewUser = async (req: Request, res: Response): Promise<Response> => {
    const user: UserAddToChat = req.body;
    user.roleId = Role.regular;
    try {

      logger.userLogger.info("save new user", { Data: user });
      const result = await this.userService.createUser(user);
      const createdUser = await this.redisUserCache.setUser(result);
      logger.redisLogger.info("createdUser: ", { User: createdUser });
      return apiResponse(res, successResponse(result), StatusCodes.CREATED);
    } catch (error) {
      logger.userLogger.error("error while saving user", { Path: req.originalUrl, Data: user, meta: { ...error } });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  // todo super admin could not update himself
  public updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const user: UserAddToChat = {
      ...req.body,
      telegramId: req.params.telegramId
    };
    try {
      logger.userLogger.info("update user by id", { Data: user });
      const result = await this.userService.updateUser(user);
      if (result) {
        if (result[0] !== 0) {
          const updatedUser = await this.redisUserCache.setUser(result[1][0] as UserAddToChat);
          logger.redisLogger.info(`updatedUser:`, { User: updatedUser });
        }
      }
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error while updating user", {
        Path: req.originalUrl,
        Data: user,
        meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public countAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      logger.userLogger.info("count all users");
      const result = await this.userService.findAndCountAll();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error while counting users", { Path: req.originalUrl, meta: { ...error } });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public countByType = async (req: Request, res: Response): Promise<Response> => {
    const { typeId } = req.params;
    try {
      logger.userLogger.info("count all users", { Data: typeId });
      const result = await this.userService.findAndCountByType(parseInt(typeId, 10));
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error while counting users by type", {
        Path: req.originalUrl,
        Data: typeId,
        meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id, telegramId } = req.params;
    try {
      logger.userLogger.info("delete user by id", { Data: telegramId });
      const result = await this.userService.deleteUser(telegramId);
      if (result === 0) return apiResponse(res, failedResponse(customErrors.NOT_FOUND.message), StatusCodes.NOT_FOUND);
      const deleteUser = await this.redisUserCache.deleteUser(telegramId);
      logger.redisLogger.info(`User deleted from redis`, { User: deleteUser });

      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error while deleting user", {
        Path: req.originalUrl,
        Data: telegramId,
        meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getAllAdmins = async (req: Request, res: Response): Promise<Response> => {
    const roleId = Role.admin;
    try {
      logger.userLogger.info("get all admins");
      const users = await this.userService.getAllUsersByRole(roleId);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error while getting all admins", {
        Path: req.originalUrl,
        meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUserByTelegramName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    const { telegramName } = req.params;
    try {
      logger.userLogger.info("get user by telegram name", { Data: telegramName });

      const users = await this.userService.getAllUsersByTelName(telegramName);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error getting users by telegram name", {
        Path: req.originalUrl,
        Data: telegramName,
        meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUserByPhone = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    const { phone } = req.params;
    try {
      logger.userLogger.info("get user by phone", { Data: phone });
      const users = await this.userService.getAllUsersByPhone(phone);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error getting users by phone", {
        Path: req.originalUrl,
        Data: phone,
        meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUserByCity = async (
    req: Request,
    res: Response
  ): Promise<Response | undefined> => {
    const { city } = req.params;
    try {
      logger.userLogger.info(" getting users by telegram city", { Data: city });
      const users = await this.userService.getAllUsersByCity(city);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error getting users by telegram city", {
        Path: req.originalUrl,
        Data: city, meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUserByName = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { name } = req.params;
    try {
      logger.userLogger.info(" getting users by telegram name", { Data: name });
      const users = await this.userService.getAllUsersByName(name);
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error getting users by telegram name", {
        Path: req.originalUrl,
        Data: name, meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUserByRole = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;
    try {
      logger.userLogger.info(" getting users by role", { Data: id });

      const users = await this.userService.getAllUsersByRole(parseInt(id, 10));
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error getting users by role", {
        Path: req.originalUrl,
        Data: id, meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUserByType = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { type } = req.params;
    try {
      logger.userLogger.info("error getting users by type", { Data: type });

      const users = await this.userService.getAllUsersByRole(parseInt(type, 10));
      return apiResponse(res, successResponse(users), StatusCodes.OK);
    } catch (error) {
      logger.userLogger.error("error getting users by type", {
        Path: req.originalUrl,
        Data: type, meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
}
