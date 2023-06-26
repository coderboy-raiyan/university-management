import { NextFunction, Request, Response } from 'express';
import { userValidation } from '../app/modules/users/user.validation';

async function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await userValidation.createZodSchema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
      cookies: req.cookies,
    });
    return next();
  } catch (error) {
    next(error);
  }
}

export default validateRequest;
