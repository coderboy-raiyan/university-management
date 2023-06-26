/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import ApiError from '../errors/ApiError';
import handleValidationError from '../errors/handleValidationError';

import { IGenericErrorMessage } from '../interfaces/error';
import { errorLogger } from '../shared/logger';
import handleZodError from './../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env != 'production'
    ? console.log(`globalErrorHandler - ${error}`)
    : errorLogger.error(error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error.name === 'ValidationError') {
    const simplifiedVersion = handleValidationError(error);
    statusCode = simplifiedVersion.statusCode;
    message = simplifiedVersion.message;
    errorMessages = simplifiedVersion.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error.message ? [{ path: '', message: error.message }] : [];
  } else if (error instanceof ZodError) {
    const simplifiedVersion = handleZodError(error);
    statusCode = simplifiedVersion.statusCode;
    message = simplifiedVersion.message;
    errorMessages = simplifiedVersion.errorMessages;
  } else {
    message = error?.message;
    errorMessages = error.message ? [{ path: '', message: error.message }] : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env != 'production' ? error.stack : undefined,
  });
};

export default globalErrorHandler;
