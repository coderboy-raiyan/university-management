/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import config from '../config';
import ApiError from '../errors/ApiError';
import handleValidationError from '../errors/handleValidationError';
import { IGenericErrorMessage } from '../interfaces/error';

function globalErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error.name == 'ValidationError') {
    const simplifiedVersion = handleValidationError(error);
    statusCode = simplifiedVersion.statusCode;
    message = simplifiedVersion.message;
    errorMessages = simplifiedVersion.errorMessages;
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error.message ? [{ path: '', message: error.message }] : [];
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error.message ? [{ path: '', message: error.message }] : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env != 'production' ? error.stack : undefined,
  });
}

export default globalErrorHandler;
