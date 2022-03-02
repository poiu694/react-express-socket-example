import { Router } from 'express';

const rootRouter = Router();

rootRouter.use('/api/chat', (req, res) => {
  res.send({
    message: 'Hello World',
  });
});

export default rootRouter;
