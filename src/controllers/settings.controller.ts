/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { SettingsModel } from "sequelize/models/settings.model";
import { apiResponse, successResponse } from "../utils/response";
import { logger } from "../utils/logger";
import SettingsService from "../services/settings.service";

export default class SettingsController {
  public settingsService: SettingsService;

  constructor(settingsService: SettingsService) {
    this.settingsService = settingsService;
  }

  public getAllSettings = async (
    req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      logger.settingLogger.info("get all settings");
      const settings = await this.settingsService.getAllSettings();
      return apiResponse(res, successResponse(settings), StatusCodes.OK);
    } catch (error) {
      logger.settingLogger.error("error while getting all settings", {
        meta: { ...error }
      });
      next(error);
    }
  };

  public udpdateById = async (
    req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const setting: SettingsModel = {
        ...req.body,
        id: req.params.id
      };
      logger.settingLogger.info("update setting");
      const settings = await this.settingsService.updateSetting(setting);
      return apiResponse(res, successResponse(settings), StatusCodes.OK);
    } catch (error) {
      logger.settingLogger.error("error while updating", {
        meta: { ...error }
      });
      next(error);

    }
  };

  public createSetting = async (
    req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { setting } = req.body;
      logger.settingLogger.info("create setting");
      const settings = await this.settingsService.createSetting(setting);
      return apiResponse(res, successResponse(settings), StatusCodes.OK);
    } catch (error) {
      logger.settingLogger.error("error while creating", {
        meta: { ...error }
      });
      next(error);

    }
  };

  public deleteValue = async (
    req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { value } = req.body;
      logger.settingLogger.info("delete setting");
      const settings = await this.settingsService.deleteValue(value);
      return apiResponse(res, successResponse(settings), StatusCodes.OK);
    } catch (error) {
      logger.settingLogger.error("error while deleting setting", {
        meta: { ...error }
      });
      next(error);

    }
  };
}
