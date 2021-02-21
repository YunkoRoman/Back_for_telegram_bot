/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import FaqsService from 'services/faqs.service';
import { FaqModel } from 'sequelize/models/faq.model';
import UserService from 'services/user.service';
import UserTypesService from 'services/user.types.service';
import { UserTypeModel } from 'sequelize/models/user.type.model';
import UnansweredService from 'services/unanswered.service';
import validator from 'validator';
import { apiResponse, failedResponse, successResponse } from '../utils/response';
import { logger } from '../utils/logger';
import { customErrors } from '../errors/customErrors';

export default class AdminController {
  private faqsService: FaqsService;

  private userService: UserService;

  private userTypesService: UserTypesService;

  private unansweredService: UnansweredService;

  constructor(
    faqsService: FaqsService,
    userService: UserService,
    userTypesService: UserTypesService,
    unansweredService: UnansweredService,
  ) {
    this.faqsService = faqsService;
    this.userService = userService;
    this.userTypesService = userTypesService;
    this.unansweredService = unansweredService;
  }

  public getMostPopularFaqs = async (req: Request, res: Response): Promise<Response> => {
    try {
      logger.adminLogger.info('find most popular faqs');
      const result = await this.faqsService.getMostPopular();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error('unable to get most popular faqs', {
        Path: req.originalUrl,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUnanswered = async (req: Request, res: Response): Promise<Response> => {
    try {
      logger.adminLogger.info('getting all unanswered questions');
      const result = await this.unansweredService.getAllUnanswered();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error('unable to get unanswered', {
        Path: req.originalUrl,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public editUniversityInfo = async (req: Request, res: Response): Promise<Response> => {
    const faqToEdit: FaqModel = req.body;
    // University qustion id
    faqToEdit.id = 2;
    try {
      logger.adminLogger.info('edit university info', { Data: faqToEdit });
      const result = await this.faqsService.updateFaqById(faqToEdit);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error('unable to edit university info', {
        Path: req.originalUrl,
        Data: faqToEdit,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public editFacultyInfo = async (req: Request, res: Response): Promise<Response> => {
    const faqToEdit: FaqModel = req.body;
    // Faculty qustion id
    faqToEdit.id = 1;
    try {
      logger.adminLogger.info('edit faculty info', { Data: faqToEdit });
      const result = await this.faqsService.updateFaqById(faqToEdit);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error('unable to edit faculty info', {
        Path: req.originalUrl,
        Data: faqToEdit,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public refreshFaqs = async (req: Request, res: Response): Promise<Response> => {
    try {
      logger.adminLogger.info('getting all faqs');
      const result = await this.faqsService.getAllFaqs();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error('unable to get faqs', {
        Path: req.originalUrl,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public selectUsersByCategory = async (req: Request, res: Response): Promise<Response> => {
    const { type } = req.body;
    try {
      logger.adminLogger.info('select users by type', { Data: type });
      const result = await this.userService.getAllUsersByType(type);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error('unable select users by type', {
        Path: req.originalUrl,
        Data: type,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getAllUserTypes = async (req: Request, res: Response): Promise<Response> => {
    try {
      logger.adminLogger.info('get all user types');
      const faqs = await this.userTypesService.getAllUserTypes();
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error('error while getting all user types', {
        Path: req.originalUrl,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);

      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public addNewType = async (req: Request, res: Response): Promise<Response> => {
    const type: UserTypeModel = req.body;
    try {
      logger.adminLogger.info('add new category(type)', { Data: type });
      const result = await this.userTypesService.addNewUserType(type);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.adminLogger.error('unable select users by type', {
        Path: req.originalUrl,
        Data: type,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);

      return apiResponse(res, failedResponse(error.message), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
}
