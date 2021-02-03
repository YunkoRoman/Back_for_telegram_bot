import validator from 'validator';
import { UserAddToChat } from '../types/types';

function validateNewUser(user: UserAddToChat) {
  const errors: any = [];
  const { phoneNumber = '' } = user;
  if (!validator.isMobilePhone(phoneNumber)) {
    errors.push({ phoneNumber: 'is invalid mobile phone number' });
  }
  return errors;
}

export default validateNewUser;
