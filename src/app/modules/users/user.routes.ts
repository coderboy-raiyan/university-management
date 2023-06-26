import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import userControllers from './user.controller';

const userRoutes = express.Router();

userRoutes.post('/create-user', validateRequest, userControllers.createUser);

export default userRoutes;
