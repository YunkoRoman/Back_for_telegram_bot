/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { FaqModel } from "../sequelize/models/faq.model";
import UnansweredService from "../services/unanswered.service";
import { apiResponse, failedResponse, successResponse } from "../utils/response";
import { logger } from "../utils/logger";
import FaqsService from "../services/faqs.service";

export default class FaqsController {
  public faqsService: FaqsService;
  public unansweredService: UnansweredService;

  constructor(faqsService: FaqsService, unansweredService: UnansweredService) {
    this.faqsService = faqsService;
    this.unansweredService = unansweredService;
  }

  public getAllFaqs = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      logger.faqLogger.info("get all faqs");
      const faqs = await this.faqsService.getAllFaqs();
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error("error while getting all faqs", {
        meta: { ...error }
      });
      next(error);
    }
  };

  public getFaqById = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const { id } = req.params;
    try {
      logger.faqLogger.info("get faq by id");
      const faqs = await this.faqsService.getFaqById(parseInt(id, 10));
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error("error while getting faq by id", {
        meta: { ...error }
      });
      next(error);
    }
  };

  public getFaqByQuestion = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const faq = <FaqModel>(<unknown>req.query);
    try {
      logger.faqLogger.info("get faq by question");
      const faqs = await this.faqsService.getFaqByQuestion(faq);
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error("error while getting faq by question", {
        meta: { ...error }
      });
      next(error);
    }
  };

  // Hardcoded info ID!!!
  public getFacultyInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const faqId = 1;
    try {
      logger.faqLogger.info("get faculty info");
      const result = await this.faqsService.getFaqById(faqId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error("unable to get faculty info", {
        meta: { ...error }
      });
      next(error);
    }
  };

  public getUniversityInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    // University qustion id
    const faqId = 2;
    try {
      logger.faqLogger.info("get university info");
      const result = await this.faqsService.getFaqById(faqId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error("unable to get university info", {
        meta: { ...error }
      });
      next(error);
    }
  };

  public getPopularFaqs = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      logger.faqLogger.info("get popular faqs");
      const result = await this.faqsService.getOnlyPopular();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error("unable to get popular faqs", {
        meta: { ...error }
      });
      next(error);
    }
  };
  public getAllUnanswered = async (
    req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      logger.faqLogger.info("get unanswered");
      const result = await this.unansweredService.getAllUnanswered();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error("unable to get unanswered");
      next(error);
    }
  };

  public addUnanswered = async (
    req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const newUnansd = {
      ...req.body
    };
    try {
      logger.faqLogger.info("crete unanswered");
      const result = await this.unansweredService.addNewUnanswered(newUnansd);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error("unable to create unanswered");
      next(error);
    }
  };

  public getUnansweredByQuestion = async (
    req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const { question } = req.params;
    try {
      logger.faqLogger.info("get unanswered by question");
      const result = await this.unansweredService.getUnansweredByQuestion(question);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error("unable to get unanswered by question");
      next(error);
    }
  };
}
