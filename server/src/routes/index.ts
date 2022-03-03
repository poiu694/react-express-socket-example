import { Router } from 'express';
import chatRouter from './chat.route';
import userRouter from './user.route';

const rootRouter = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/chat', chatRouter);

export default rootRouter;
