import { Router } from 'express';
import userRouter from './user.route';

const rootRouter = Router();

rootRouter.use('/user', userRouter);

export default rootRouter;
