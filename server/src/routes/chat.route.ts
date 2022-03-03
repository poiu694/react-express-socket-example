import chatController from '@src/controller/chat.controller';
import { Router } from 'express';

const chatRouter = Router();

chatRouter.get('/', chatController.getAllChat);
chatRouter.post('/', chatController.createChat);

export default chatRouter;
