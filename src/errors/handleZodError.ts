import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponseMessage } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponseMessage => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode: 400,
    errorMessages: errors,
    message: 'validation error',
  };
};

export default handleZodError;
