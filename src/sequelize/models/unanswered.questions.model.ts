import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BuildOptions,
} from 'sequelize';

export interface UnanswdQuestionAttributes {
  id: number;
  question: string;
  stats: number;
}

export interface UnanswdQuestionModel extends Model<UnanswdQuestionAttributes>,
UnanswdQuestionAttributes {}

export type UnanswdQuestionStatic = typeof Model & {
  // eslint-disable-next-line no-unused-vars
  new (values?: object, options?: BuildOptions): UnanswdQuestionModel;
};

export interface UnanswdQuestionCreationAttributes extends Optional<UnanswdQuestionAttributes, 'id'> {}

export class UnanswdQuestion extends Model<UnanswdQuestionAttributes,
  UnanswdQuestionCreationAttributes>
  implements UnanswdQuestionAttributes {
    public id!: number;

    question!: string;

    stats!: number;
}

export function initUnansewredQuestions(sequelize: Sequelize) {
  return <UnanswdQuestionStatic>sequelize.define('chat_bot_answered_questions', {
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
