/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

import { IGenericErrorResponseMessage } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

function handleValidationError(
  error: mongoose.Error.ValidationError
): IGenericErrorResponseMessage {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (err: any) => {
      return {
        path: err?.path,
        message: err?.message,
      };
    }
  );

  return {
    statusCode: 400,
    errorMessages: errors,
    message: 'validation error',
  };
}

export default handleValidationError;
