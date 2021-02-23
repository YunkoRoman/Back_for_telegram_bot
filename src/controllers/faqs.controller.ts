/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import DialogFlow from '../dialogflow/dialogflow';
import {
  CONTACTS_FAQ_INTENT_NAME, FACULTY_FAQ_INTENT_NAME, Intent, UNIVERCITY_FAQ_INTENT_NAME,
} from '../types/types';
import { FaqModel } from '../sequelize/models/faq.model';
import UnansweredService from '../services/unanswered.service';
import { apiResponse, failedResponse, successResponse } from '../utils/response';
import { logger } from '../utils/logger';
import FaqsService from '../services/faqs.service';
import { parseIntents } from '../utils/intent.parser';

export default class FaqsController {
  public faqsService: FaqsService;

  public dialogflowClient = new DialogFlow();

  public unansweredService: UnansweredService;

  constructor(faqsService: FaqsService, unansweredService: UnansweredService) {
    this.faqsService = faqsService;
    this.unansweredService = unansweredService;
  }

  public fetchIntents = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const intents: [] = await this.dialogflowClient.listIntents();

      if (intents.length > 0) {
        const faqs: FaqModel[] = parseIntents(intents);
        try {
          const result = await this.faqsService.storeIntents(faqs);
          return apiResponse(res, successResponse({ 'fetched intents count': result.length }), StatusCodes.OK);
        } catch (error) {
          logger.faqLogger.error('could not save intents as faqs', {
            requestPath: req.originalUrl,
            meta: { ...error },
          });
          return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
        }
      }
      logger.faqLogger.error('no intents received from dialogflow', { requestPath: req.originalUrl });
      return apiResponse(res, failedResponse('no intents received from dialogflow'), StatusCodes.BAD_REQUEST);
    } catch (error) {
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`, { requestPath: req.originalUrl });
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public updateCount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { queryResult } = req.body;
    const intent: Intent = {
      fulfillmentMessages: queryResult.fulfillmentMessages,
      name: queryResult.intent.name,
      displayName: queryResult.intent.displayName,
    };
    try {
      const result = await this.faqsService.updateCount(intent);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('unable to update count', {
        requestPath: req.originalUrl,
        Data: intent,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getAllFaqs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      logger.faqLogger.info('get all faqs');
      const faqs = await this.faqsService.getAllFaqs();
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('error while getting all faqs', {
        requestPath: req.originalUrl,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getFaqById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { id } = req.params;
    try {
      logger.faqLogger.info('get faq by id', { Data: id });
      const faqs = await this.faqsService.getFaqById(parseInt(id, 10));
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('error while getting faq by id', {
        requestPath: req.originalUrl,
        Data: id,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getFaqByIntentName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { intentName } = req.params;
    try {
      logger.faqLogger.info('get faq by id', { Data: intentName });
      const faqs = await this.faqsService.getFaqByIntent(intentName);
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('error while getting faq by id', {
        requestPath: req.originalUrl,
        Data: intentName,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getFaqByQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const faq = <FaqModel>(<unknown>req.query);
    try {
      console.log(req.originalUrl);
      logger.faqLogger.info('get faq by question', { Data: faq });
      const faqs = await this.faqsService.getFaqByQuestion(faq);
      return apiResponse(res, successResponse(faqs), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('error while getting faq by question', {
        requestPath: req.originalUrl,
        Data: faq,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getFacultyInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const faqId = FACULTY_FAQ_INTENT_NAME;
    try {
      logger.faqLogger.info('get faculty info');
      const result = await this.faqsService.getFaqByIntent(faqId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('unable to get faculty info', {
        requestPath: req.originalUrl,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getContactsInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const faqId = CONTACTS_FAQ_INTENT_NAME;
    try {
      logger.faqLogger.info('get contacts info');
      const result = await this.faqsService.getFaqByIntent(faqId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('unable to get contacts info', {
        requestPath: req.originalUrl,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUniversityInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const faqId = UNIVERCITY_FAQ_INTENT_NAME;
    try {
      logger.faqLogger.info('get university info');
      const result = await this.faqsService.getFaqByIntent(faqId);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('unable to get university info', {
        requestPath: req.originalUrl,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getPopularFaqs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      logger.faqLogger.info('get popular faqs');
      const result = await this.faqsService.getOnlyPopular();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('unable to get popular faqs', {
        requestPath: req.originalUrl,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getAllUnanswered = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      logger.faqLogger.info('get unanswered');
      const result = await this.unansweredService.getAllUnanswered();
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('unable to get unanswered', { requestPath: req.originalUrl, meta: error });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public addFaq = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> => {
    const faq: FaqModel = req.body;
    try {
      logger.faqLogger.info('add faq', { Data: faq });
      const result = await this.faqsService.addNewFaq(faq);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('error while adding faq', {
        requestPath: req.originalUrl,
        Data: faq,
        meta: { ...error },
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public addUnanswered = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const newUnansd = {
      ...req.body,
    };
    try {
      logger.faqLogger.info('crete unanswered', { Data: newUnansd });
      const result = await this.unansweredService.addNewUnanswered(newUnansd);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('unable to create unanswered', {
        requestPath: req.originalUrl,
        Data: newUnansd,
        meta: error,
      });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  public getUnansweredByQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const { question } = req.params;
    try {
      logger.faqLogger.info('get unanswered by question', { Data: question });
      const result = await this.unansweredService.getUnansweredByQuestion(question);
      return apiResponse(res, successResponse(result), StatusCodes.OK);
    } catch (error) {
      logger.faqLogger.error('unable to get unanswered by question', { requestPath: req.originalUrl, Data: question, meta: error });
      logger.serverLogger.error(`Server error ${error.message}  CODE ${error.code}`);
      return apiResponse(res, failedResponse(error), StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
}
