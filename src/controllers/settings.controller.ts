/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { SettingsModel } from "sequelize/models/settings.model";
import { apiResponse, successResponse } from "../utils/response";
import { logger } from "../utils/logger";
import SettingsService from "../services/settings.service";
import validator from "validator";
import { customErrors } from "../errors/customErrors";

export default class SettingsController {
  public settingsService: SettingsService;

  constructor(settingsService: SettingsService) {
    this.settingsService = settingsService;
  }

  public getAllSettings = async (
    req: Request, res: Response): Promise<Response> => {
    try {
      logger.settingLogger.info("get all settings");
      const settings = await this.settingsService.getAllSettings();
      return apiResponse(res, successResponse(settings), StatusCodes.OK);
    } catch (error) {
      logger.settingLogger.error("error while getting all settings", {
        Path: req.originalUrl,
        meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public udpdateById = async (
    req: Request, res: Response): Promise<Response> => {
    try {
      const setting: SettingsModel = {
        ...req.body,
        id: req.params.id
      };

      logger.settingLogger.info("update setting", { Data: setting });
      const settings = await this.settingsService.updateSetting(setting);
      return apiResponse(res, successResponse(settings), StatusCodes.OK);
    } catch (error) {
      logger.settingLogger.error("error while updating", {
        Data: setting,
        Path: req.originalUrl,
        meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public createSetting = async (
    req: Request, res: Response): Promise<Response> => {
    try {
      const { setting } = req.body;
      logger.settingLogger.info("create setting", { Data: setting });
      const settings = await this.settingsService.createSetting(setting);
      return apiResponse(res, successResponse(settings), StatusCodes.OK);
    } catch (error) {
      logger.settingLogger.error("error while creating", {
        Data: setting,
        Path: req.originalUrl,
        meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public deleteValue = async (
    req: Request, res: Response): Promise<Response> => {
    try {
      const { value } = req.body;
      logger.settingLogger.info("delete setting", { Data: value });
      const settings = await this.settingsService.deleteValue(value);
      return apiResponse(res, successResponse(settings), StatusCodes.OK);
    } catch (error) {
      logger.settingLogger.error("error while deleting setting", {
        Data: value,
        Path: req.originalUrl,
        meta: { ...error }
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
}
