import { Application, NextFunction, Request, Response } from 'express';
import userRoutes from './app/modules/users/user.routes';

import cors from 'cors';
import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Server is healthy' });
});

app.use(globalErrorHandler);

export default app;
