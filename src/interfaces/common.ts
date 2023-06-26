import { IGenericErrorMessage } from './error';

export type IGenericErrorResponseMessage = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
