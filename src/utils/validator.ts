import { UserAddToChat } from 'types/types';
import validator from 'validator';
import { Role } from '../sequelize/models/user.role.model';

// eslint-disable-next-line import/prefer-default-export
export function isValidTelegramId(telegramId: any) {
  const errors = [];
  if (!telegramId) {
    errors.push('Please provide user telegram id');
    return errors;
  }
  if (!validator.isNumeric(telegramId)) {
    errors.push('Telegram id is not a number');
  }
  return errors;
}

export function invalidFields(user: UserAddToChat) {
  const errors: any[] = [];

  if (user.roleId && ![Role.regular, Role.admin, Role.superAdmin].includes(user.roleId)) {
    errors.push('User role is invalid');
  }
  return errors;
}
