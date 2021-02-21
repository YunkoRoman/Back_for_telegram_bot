export const applicationJson = 'application/json';

// eslint-disable-next-line no-useless-escape
// Ukraine phone number
// export const PHONE_REGEX = '^\\+?3?8?(0\\d{9})$';
// Stub expression
export const PHONE_REGEX = '.*';
export interface UserAddToChat {
  id: number;
  telegramId: string;
  telegramName: string;
  name: string;
  phoneNumber: string;
  city: string;
  step: JSON;
  roleId: number;
  typeId: string;
}

export interface Intent {
  name: string;
  displayName: string;
  fulfillmentMessages: any;
}

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
}

export interface FailedResponse<T = any> {
  success: false;
  data: T;
}