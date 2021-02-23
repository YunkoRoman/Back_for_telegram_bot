import { Op } from 'sequelize';
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

  public getUnansweredById = async (
    unansweredId: number,
  ): Promise<UnanswdQuestionModel | null> => {
    const result = await this.DB.UnanswdQuestions.findOne({ where: { id: unansweredId } });
    return result;
  };

  public getUnansweredByQuestion = async (
    unansweredQuestion: string,
  ): Promise<UnanswdQuestionModel[]> => {
    const result = await this.DB.UnanswdQuestions.findAll({
      where: {
        question: {
          [Op.like]: unansweredQuestion,
        },
      },
    });
    return result;
  };

  public addNewUnanswered = async (
    unanswered: UnanswdQuestionModel,
  ): Promise<UnanswdQuestionModel> => {
    const result = await this.DB.UnanswdQuestions.create(unanswered);
    return result;
  };

  public updateUnansweredById = async (
    unanswered: UnanswdQuestionModel,
  ): Promise<UnanswdQuestionModel | any> => {
    await this.DB.UnanswdQuestions.update(unanswered, { where: { id: unanswered.id } });
  };

  public deleteUnansweredById = async (unansweredId: number): Promise<number> => {
    const result = await this.DB.UnanswdQuestions.destroy({ where: { id: unansweredId } });
    return result;
  };
}
