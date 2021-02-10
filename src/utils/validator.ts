import validator from 'validator';
import logger from './logger';

// eslint-disable-next-line import/prefer-default-export
export function isValidTelegramId(telegramId:any) {
  const errors = [];
  if (!telegramId) {
    errors.push('Please provide "X-User-id" in header');
  }
  logger.info(Number.isNaN(telegramId));
  if (Number.isNaN(parseInt(telegramId, 10))) {
    errors.push('Telegram id is not a number');
  }
  return errors;
}
