export const applicationJson = 'application/json';

export const FACULTY_FAQ_INTENT_NAME = 'projects/newagent-dayq/agent/intents/69d40d85-2580-4835-8bfd-735f2624ca31';
export const UNIVERCITY_FAQ_INTENT_NAME = 'projects/newagent-dayq/agent/intents/aefd34cd-4216-44f6-9480-9ae5f2ee80d0';
export const CONTACTS_FAQ_INTENT_NAME = 'projects/newagent-dayq/agent/intents/f0dbe143-e049-4406-a735-de35ff7b4bca';

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
  pointer: string;
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
