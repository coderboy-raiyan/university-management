import { NextFunction, Request, Response } from 'express';
import userServices from './user.services';

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await userServices.createUser(req.body);
    res.status(201).json({
      success: true,
      message: 'user created successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
}
export default { createUser };
