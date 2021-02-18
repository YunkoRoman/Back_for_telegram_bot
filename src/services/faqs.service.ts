import { Op, Transaction } from 'sequelize';
import { Intent } from 'types/types';
import { resolve } from 'path';
import { logger } from '../utils/logger';
import { Faq, FaqModel } from '../sequelize/models/faq.model';
import { DB } from '../sequelize/models/index';

export default class FaqsService {
  private DB;

  // eslint-disable-next-line no-shadow
  constructor(db: DB) {
    this.DB = db;
  }

  public getMostPopular = async (): Promise<FaqModel[]> => this.DB.Faqs.findAll({
    order: [['stats', 'DESC']],
    limit: 10,
  });

  public getOnlyPopular = async (): Promise<FaqModel[]> => this.DB.Faqs.findAll({
    where: {
      question: {
        [Op.notIn]: ['faculty', 'university'],
      },
    },
  });

  public updateCount = async (intent: Intent): Promise<FaqModel> => this.DB.Faqs
    .increment('stats', {
      where: {
        intentName: intent.name,
      },
    })

  public storeIntents = async (intents: FaqModel[]): Promise<any> => {
    try {
      intents.forEach(async (intent) => {
        const faq = await this.DB.Faqs
          .findOne({ where: { intentName: intent.intentName } });
        if (faq) {
          return faq.update({ answer: intent.answer });
        }
        return this.DB.Faqs.create({ ...intent });
      });
      return intents;
    } catch (err) {
      logger.faqLogger.error(err);
    }
    return [];
  };

  // ============ CRUD ==============

  public getAllFaqs = async (): Promise<FaqModel[]> => this.DB.Faqs.findAll();

  public getFaqById = async (faqId: number): Promise<FaqModel | null> => this.DB.Faqs
    .findOne({ where: { id: faqId } });

  public getFaqByQuestion = async (faq: FaqModel): Promise<FaqModel[]> => this.DB.Faqs
    .findAll({
      where: {
        question: {
          [Op.like]: faq.question,
        },
      },
    });

  public addNewFaq = async (faq: FaqModel): Promise<FaqModel> => this.DB.Faqs
    .create(faq);

  public updateFaqById = async (faq: FaqModel): Promise<FaqModel | any> => this.DB.Faqs
    .update(faq, { where: { id: faq.id } });

  public deleteFaqById = async (faqId: number): Promise<number> => this.DB.Faqs
    .destroy({ where: { id: faqId } });
}
