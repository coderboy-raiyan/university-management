import { RequestHandler } from 'express';
import userServices from './user.services';

const createUser: RequestHandler = async (req, res, next) => {
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
};

const userControllers = { createUser };

export default userControllers;
