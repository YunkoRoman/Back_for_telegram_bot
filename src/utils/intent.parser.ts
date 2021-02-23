import { FaqModel } from 'sequelize/models/faq.model';

// eslint-disable-next-line import/prefer-default-export
export const parseIntents = (intents: any[]): FaqModel[] => intents
  .map((intent) => (<FaqModel>{
    intentName: intent.name,
    question: intent.displayName,
    answer: JSON.stringify(intent.messages),
  }));
