import { Op } from 'sequelize';
import { Intent } from 'types/types';
import { logger } from '../utils/logger';
import { FaqModel } from '../sequelize/models/faq.model';
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

  public storeIntents = async (intents: FaqModel[]): Promise<any> => this.DB.sequelize
    .transaction(async (t) => {
      let results = [];
      let updates = [];
      try {
        results = intents.map((intent) => this.DB.Faqs
          .findOne({ where: { intentName: intent.intentName }, transaction: t }));
        results = await Promise.all(results);
        updates = results.map((res, i) => (res !== null
          ? res.update({ answer: intents[i].answer }, { transaction: t })
          : this.DB.Faqs.create({ ...intents[i] }, { transaction: t })));
        await Promise.all(updates);
        return updates;
      } catch (err) {
        logger.faqLogger.error(err);
      }
      return [];
    });

  // ============ CRUD ==============

  public getAllFaqs = async (): Promise<FaqModel[]> => this.DB.Faqs.findAll();

  public getFaqById = async (faqId: number): Promise<FaqModel | null> => this.DB.Faqs
    .findOne({ where: { id: faqId } });

  public getFaqByIntent = async (intentNameParam: string): Promise<FaqModel | null> => this.DB.Faqs
    .findOne({ where: { intentName: intentNameParam } });

  public getFaqByQuestion = async (faq: FaqModel): Promise<FaqModel[]> => this.DB.Faqs
    .findAll({
      where: {
        question: {
          [Op.substring]: faq.question,
        },
      },
    });

  public addNewFaq = async (faq: FaqModel): Promise<FaqModel> => this.DB.Faqs
    .create(faq);

  public updateFaqByIntentName = async (faq: FaqModel): Promise<FaqModel | any> => this.DB.Faqs
    .update(faq, { where: { intentName: faq.intentName } });

  public deleteFaqByIntentName = async (faqIntentName: string): Promise<number> => this.DB.Faqs
    .destroy({ where: { intentName: faqIntentName } });
}
