import express from 'express';
import userControllers from './user.controller';

const userRoutes = express.Router();

userRoutes.post('/create-user', userControllers.createUser);

export default userRoutes;
