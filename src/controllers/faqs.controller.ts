/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { FaqModel } from '../sequelize/models/faq.model';
import { apiResponse, failedResponse, successResponse } from '../utils/response';
import logger from '../utils/logger';
import FaqsService from '../services/faqs.service';

export default class FaqsController {
  public faqsService: FaqsService;

  constructor(faqsService: FaqsService) {
    this.faqsService = faqsService;
  }

  public getAllFaqs = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      logger.info('get all faqs');
      const faqs = await this.faqsService.getAllFaqs();
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.error('error while getting all faqs', {
        meta: { ...error },
      });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getFaqById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.params;
    try {
      logger.info('get faq by id');
      const faqs = await this.faqsService.getFaqById(parseInt(id, 10));
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.error('error while getting faq by id', {
        meta: { ...error },
      });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getFaqByQuestion = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const faq = <FaqModel>(<unknown>req.query);
    try {
      logger.info('get faq by question');
      const faqs = await this.faqsService.getFaqByQuestion(faq);
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.error('error while getting faq by question', {
        meta: { ...error },
      });
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  // Hardcoded info ID!!!
  public getFacultyInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const faqId = 1;
    try {
      logger.info('get faculty info');
      const result = await this.faqsService.getFaqById(faqId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('unable to get faculty info');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUniversityInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    // University qustion id
    const faqId = 2;
    try {
      logger.info('get university info');
      const result = await this.faqsService.getFaqById(faqId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('unable to get university info');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getPopularFaqs = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      logger.info('get popular faqs');
      const result = await this.faqsService.getOnlyPopular();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.error('unable to get popular faqs');
      return apiResponse(res, failedResponse(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
}
