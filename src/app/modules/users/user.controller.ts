import { RequestHandler } from 'express';
import { z } from 'zod';
import userServices from './user.services';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createZodSchema = z.object({
      body: z.object({
        role: z.string({ required_error: 'role is required' }),
        password: z.string().optional(),
      }),
    });
    await createZodSchema.parseAsync(req);

    const { user } = req.body;
    const result = await userServices.createUser(user);
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
