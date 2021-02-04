import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BuildOptions,
} from 'sequelize';

export interface FaqAttributes {
  id: number;
  question: string;
  answer: string;
  stats: number;
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

    public question!: string;

    public answer!: string;

    public stats!: number;
}

export function initFaq(sequelize: Sequelize) {
  return <FaqStatic>sequelize.define('chat_bot_user_type', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: new DataTypes.STRING(128),
    answer: new DataTypes.STRING(128),
    stats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
}
