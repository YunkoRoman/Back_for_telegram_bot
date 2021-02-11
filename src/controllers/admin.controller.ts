/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import FaqsService from "services/faqs.service";
import { FaqModel } from "sequelize/models/faq.model";
import UserService from "services/user.service";
import UserTypesService from "services/user.types.service";
import { UserTypeModel } from "sequelize/models/user.type.model";
import UnansweredService from "services/unanswered.service";
import { apiResponse, failedResponse, successResponse } from "../utils/response";
import { logger } from "../utils/logger";

export default class AdminController {
  private faqsService: FaqsService;

  private userService: UserService;

  private userTypesService: UserTypesService;

  private unansweredService: UnansweredService;

  constructor(faqsService: FaqsService, userService: UserService, userTypesService: UserTypesService, unansweredService: UnansweredService) {
    this.faqsService = faqsService;
    this.userService = userService;
    this.userTypesService = userTypesService;
    this.unansweredService = unansweredService;
  }

  public getMostPopularFaqs = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      logger.adminLogger.info("find most popular faqs");
      const result = await this.faqsService.getMostPopular();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error("unable to get most popular faqs",{
        meta: { ...error }
      });
      next(error);
    }
  };

  public getUnanswered = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      logger.adminLogger.info("getting all unanswered questions");
      const result = await this.unansweredService.getAllUnanswered();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error("unable to get unanswered",{
        meta: { ...error }
      });
      next(error);
    }
  };

  public editUniversityInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const faqToEdit: FaqModel = req.body;
    // University qustion id
    faqToEdit.id = 2;
    try {
      logger.adminLogger.info("edit university info");
      const result = await this.faqsService.updateFaqById(faqToEdit);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error("unable to edit university info", {
        meta: { ...error }
      });
      next(error);
    }
  };

  public editFacultyInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const faqToEdit: FaqModel = req.body;
    // Faculty qustion id
    faqToEdit.id = 1;
    try {
      logger.adminLogger.info("edit faculty info");
      const result = await this.faqsService.updateFaqById(faqToEdit);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error("unable to edit faculty info",{
        meta: { ...error }
      });
      next(error);
    }
  };

  public refreshFaqs = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const faqToEdit: FaqModel = req.body;
    try {
      logger.adminLogger.info("getting all faqs");
      const result = await this.faqsService.getAllFaqs();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error("unable to get faqs",{
        meta: { ...error }
      });
      next(error);
    }
  };

  public selectUsersByCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const { type } = req.body;
    try {
      logger.adminLogger.info("select users by type");
      const result = await this.userService.getAllUsersByType(type);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error("unable select users by type",{
        meta: { ...error }
      });
      next(error);
    }
  };

  public getAllUserTypes = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      logger.adminLogger.info("get all user types");
      const faqs = await this.userTypesService.getAllUserTypes();
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error("error while getting all user types", {
        meta: { ...error }
      });
      next(error);
    }
  };

  public addNewType = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const type: UserTypeModel = req.body;
    try {
      logger.adminLogger.info("add new category(type)");
      const result = await this.userTypesService.addNewUserType(type);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error("unable select users by type",{
        meta: { ...error }
      });
      next(error);
    }
  };
}
