import { Application, NextFunction, Request, Response } from 'express';
import userRoutes from './app/modules/users/user.routes';

import cors from 'cors';
import express from 'express';
import ApiError from './errors/ApiError';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, 'User not found'));
});

app.use(globalErrorHandler);

export default app;
