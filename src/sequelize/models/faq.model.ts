import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BuildOptions,
} from 'sequelize';

export interface FaqAttributes {
  id: number;
  intentName: string;
  question: string;
  answer: string;
  stats: number;
  pointer: string;
  step: JSON;
}

export interface FaqModel extends Model<FaqAttributes>, FaqAttributes {}

export type FaqStatic = typeof Model & {
  // eslint-disable-next-line no-unused-vars
  new (values?: object, options?: BuildOptions): FaqModel;
};

export interface FaqCreationAttributes extends Optional<FaqAttributes, 'id'> {}

export class Faq extends Model<FaqAttributes, FaqCreationAttributes>
  implements FaqAttributes {
    public id!: number;

    public intentName!: string;

    public question!: string;

    public answer!: string;

    public stats!: number;

    public pointer!: string;

    public step!: JSON;
}

export function initFaq(sequelize: Sequelize) {
  return <FaqStatic>sequelize.define('chat_bot_faq', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    intentName: {
      type: new DataTypes.TEXT('long'),
      unique: true,
    },
    question: {
      type: new DataTypes.TEXT('long'),
      unique: true,
    },
    answer: new DataTypes.TEXT('long'),
    stats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    pointer: {
      type: new DataTypes.STRING(32),
      allowNull: true,
    },
    step: {
      type: DataTypes.JSON,
    },

  }, {
    indexes: [
      {
        unique: true,
        fields: ['intentName', 'question'],
      },
    ],
  });
}
