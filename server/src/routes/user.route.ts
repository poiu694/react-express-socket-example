import userController from '@src/controller/user.controller';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/', userController.createUser);

export default userRouter;
