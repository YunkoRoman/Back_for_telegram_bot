import { FaqModel } from '../sequelize/models/faq.model';
import { DB } from '../sequelize/models/index';

export default class FaqsService {
  private DB;

  // eslint-disable-next-line no-shadow
  public constructor(db: DB) {
    this.DB = db;
  }

  public getMostPopular = async (): Promise<FaqModel[]> => {
    const result = await this.DB.Faqs.findAll({
      order: [['stats', 'DESC']],
      limit: 10,
    });
    return result;
  }

  // ============ CRUD ==============

  public getAllFaqs = async () : Promise<FaqModel[]> => {
    const result = await this.DB.Faqs.findAll();
    return result;
  }

  public addNewFaq = async (faq: FaqModel) : Promise<FaqModel> => {
    const result = await this.DB.Faqs.create(faq);
    return result;
  }

  public updateFaqById = async (faq: FaqModel) : Promise<FaqModel | any> => {
    await this.DB.Faqs.update(faq, { where: { id: faq.id } });
  }
}
