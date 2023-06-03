import { Application, Request, Response } from 'express';
import userRoutes from './app/modules/users/user.routes';

import cors from 'cors';
import express from 'express';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
