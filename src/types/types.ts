export const applicationJson = 'application/json';

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
}

export interface FailedResponse<T = any> {
  success: false;
  data: T;
}
