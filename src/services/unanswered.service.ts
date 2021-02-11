import { UnanswdQuestionModel } from '../sequelize/models/unanswered.questions.model';
import { DB } from '../sequelize/models/index';

export default class UnansweredService {
  private DB;

  // eslint-disable-next-line no-shadow
  constructor(db: DB) {
    this.DB = db;
  }

  // ============ CRUD ==============

  public getAllUnanswered = async (): Promise<UnanswdQuestionModel[]> => {
    const result = await this.DB.UnanswdQuestions.findAll();
    return result;
  };

  public getUnansweredById = async (UnansweredId: number): Promise<UnanswdQuestionModel | null> => {
    const result = await this.DB.UnanswdQuestions.findOne({ where: { id: UnansweredId } });
    return result;
  };

  public addNewUnanswered = async (Unanswered: UnanswdQuestionModel): Promise<UnanswdQuestionModel> => {
    const result = await this.DB.UnanswdQuestions.create(Unanswered);
    return result;
  };

  public updateUnansweredById = async (Unanswered: UnanswdQuestionModel): Promise<UnanswdQuestionModel | any> => {
    await this.DB.UnanswdQuestions.update(Unanswered, { where: { id: Unanswered.id } });
  };

  public deleteUnansweredById = async (UnansweredId: number): Promise<number> => {
    const result = await this.DB.UnanswdQuestions.destroy({ where: { id: UnansweredId } });
    return result;
  };
}
