import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BuildOptions,
} from 'sequelize';

export interface AnsweredQuestionsAttr {
  id: number;
  question: string;
  stats: number;
}

export interface AnsweredQuestionsModel extends Model<AnsweredQuestionsAttr>,
  AnsweredQuestionsAttr {}

export type AnsweredQuestionsStatic = typeof Model & {
  // eslint-disable-next-line no-unused-vars
  new (values?: object, options?: BuildOptions): AnsweredQuestionsModel;
};

export interface AnsweresQuestionsCreationAttributes extends Optional<AnsweredQuestionsAttr, 'id'> {}

export class AnsweredQuestions extends Model<AnsweredQuestionsAttr,
  AnsweresQuestionsCreationAttributes>
  implements AnsweredQuestionsAttr {
    public id!: number;

    question!: string;

    stats!: number;
}

export function initAnsewredQuestions(sequelize: Sequelize) {
  return <AnsweredQuestionsStatic>sequelize.define('chat_bot_answered_questions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    stats: {
      type: DataTypes.INTEGER,
    },
  });
}
