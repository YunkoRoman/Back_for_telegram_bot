import {
  Response,
} from 'express';
import {
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import { applicationJson, FailedResponse, SuccessResponse } from '../types/types';

export interface ApiResponse {
  <T>(
      // eslint-disable-next-line no-unused-vars
      res: Response,
      // eslint-disable-next-line no-unused-vars
      data: T,
      // eslint-disable-next-line no-unused-vars
      statusCode: number,
  ): Response;
}

export const apiResponse: ApiResponse = (
  res,
  data,
  statusCode,
): Response => res.format({
  json: () => {
    res.type(applicationJson);
    res.status(statusCode).send(data);
  },
  default: () => {
    res.status(StatusCodes.NOT_ACCEPTABLE).send(getReasonPhrase(StatusCodes.NOT_ACCEPTABLE));
  },
});

export function successResponse(data: any): SuccessResponse {
  return {
    success: true,
    data,
  };
}
export function failedResponse(data: any): FailedResponse {
  return {
    success: false,
    data,
  };
}
