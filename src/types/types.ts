export const applicationJson = 'application/json';

export const PHONE_REGEX = '';

export interface UserAddToChat {
  id: number;
  telegramId: string;
  telegramName: string;
  name: string;
  phoneNumber: string;
  city: string;
  step: JSON;
}

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
}

export interface FailedResponse<T = any> {
  success: false;
  data: T;
}
