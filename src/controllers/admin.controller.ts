/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import FaqsService from 'services/faqs.service';
import { FaqModel } from 'sequelize/models/faq.model';
import UserService from 'services/user.service';
import UserTypesService from 'services/user.types.service';
import { UserTypeModel } from 'sequelize/models/user.type.model';
import UnansweredService from 'services/unanswered.service';
import { apiResponse, failedResponse, successResponse } from '../utils/response';
import logger from '../utils/logger';

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

  public getMostPopularFaqs = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      logger.info('find most popular faqs');
      const result = await this.faqsService.getMostPopular();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('unable to get most popular faqs');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUnanswered = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      logger.info('getting all unanswered questions');
      const result = await this.unansweredService.getAllUnanswered();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('unable to get unanswered');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public editUniversityInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const faqToEdit: FaqModel = req.body;
    // University qustion id
    faqToEdit.id = 2;
    try {
      logger.info('edit university info');
      const result = await this.faqsService.updateFaqById(faqToEdit);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('unable to edit university info');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public editFacultyInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const faqToEdit: FaqModel = req.body;
    // Faculty qustion id
    faqToEdit.id = 1;
    try {
      logger.info('edit faculty info');
      const result = await this.faqsService.updateFaqById(faqToEdit);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('unable to edit faculty info');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public refreshFaqs = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const faqToEdit: FaqModel = req.body;
    try {
      logger.info('getting all faqs');
      const result = await this.faqsService.getAllFaqs();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('unable to get faqs');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public selectUsersByCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { type } = req.body;
    try {
      logger.info('select users by type');
      const result = await this.userService.getAllUsersByType(type);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('unable select users by type');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getAllUserTypes = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      logger.info('get all user types');
      const faqs = await this.userTypesService.getAllUserTypes();
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.error('error while getting all user types', {
        meta: { ...error },
      });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public addNewType = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const type: UserTypeModel = req.body;
    try {
      logger.info('add new category(type)');
      const result = await this.userTypesService.addNewUserType(type);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('unable select users by type');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
}
