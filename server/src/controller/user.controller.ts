import User from '@src/db/model/User';
import { Request, Response } from 'express';

class userController {
  async createUser(req: Request, res: Response) {
    const { socketId, nickname } = req.body;

    if (!socketId) {
      res.status(400).send({
        message: 'Socket Id is empty',
      });
    }

    const existedUserById = await User.findOne({
      socketId,
    });
    const existedUserByNickname = await User.findOne({
      nickname,
    });
    if (existedUserById || existedUserByNickname) {
      res.status(409).send({
        message: 'Is Already existed',
      });
      return;
    }

    const user = new User({
      socketId,
      nickname,
    });
    const data = await user.save();
    res.send(data);
  }
}

export default new userController();
