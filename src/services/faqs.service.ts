import { Op } from 'sequelize';
import { FaqModel } from '../sequelize/models/faq.model';
import { DB } from '../sequelize/models/index';

export default class FaqsService {
  private DB;

  // eslint-disable-next-line no-shadow
  constructor(db: DB) {
    this.DB = db;
  }

  public getMostPopular = async (): Promise<FaqModel[]> => {
    const result = await this.DB.Faqs.findAll({
      order: [['stats', 'DESC']],
      limit: 10,
    });
    return result;
  };

  public getOnlyPopular = async (): Promise<FaqModel[]> => {
    const result = await this.DB.Faqs.findAll({
      where: {
        question: {
          [Op.notIn]: ['faculty', 'university'],
        },
      },
    });
    return result;
  };

  // ============ CRUD ==============

  public getAllFaqs = async (): Promise<FaqModel[]> => {
    const result = await this.DB.Faqs.findAll();
    return result;
  };

  public getFaqById = async (faqId: number): Promise<FaqModel | null> => {
    const result = await this.DB.Faqs.findOne({ where: { id: faqId } });
    return result;
  };

  public getFaqByQuestion = async (faq: FaqModel): Promise<FaqModel[]> => {
    const result = await this.DB.Faqs.findAll({
      where: {
        question: {
          [Op.like]: faq.question,
        },
      },
    });
    return result;
  };

  public addNewFaq = async (faq: FaqModel): Promise<FaqModel> => {
    const result = await this.DB.Faqs.create(faq);
    return result;
  };

  public updateFaqById = async (faq: FaqModel): Promise<FaqModel | any> => {
    await this.DB.Faqs.update(faq, { where: { id: faq.id } });
  };

  public deleteFaqById = async (faqId: number): Promise<number> => {
    const result = await this.DB.Faqs.destroy({ where: { id: faqId } });
    return result;
  };
}
