import { UserAddToChat } from 'types/types';
import validator from 'validator';
import { Role } from '../sequelize/models/user.role.model';
import { logger } from "./logger";
import { customErrors } from "../errors/customErrors";

// eslint-disable-next-line import/prefer-default-export
export function isValidTelegramId(telegramId:any) {
  const errors = [];
  if (!telegramId) {
    logger.faqLogger.error(customErrors.BAD_REQUEST_NO_TELEGRAM_ID.messageParams, {
      Data: telegramId
    });
    errors.push('Please provide user  id');
    return errors;
  }
  if (!validator.isNumeric(telegramId)) {
    logger.faqLogger.error(customErrors.BAD_REQUEST_TYPE_ID_NO_NUMBER.message, {
      Data: telegramId
    });
    errors.push('Id is not a number');

  }

  return errors;
}

export function invalidFields(user: UserAddToChat) {
  const errors: any[] = [];

  // errors.push(...isValidTelegramId(user.telegramId));
  // if (user.phoneNumber) {
  // }

  if (user.roleId && ![Role.regular, Role.admin, Role.superAdmin].includes(user.roleId)) {
    errors.push('User role is invalid');
  }
  if (user.typeId && ![1, 2, 3, 4, 5].includes(user.typeId)) {
    errors.push('User type is invalid');
  }
  return errors;
}
