import Chat from '@src/db/model/Chat';
import { Request, Response } from 'express';

class chatController {
  async getAllChat(req: Request, res: Response) {
    const chats = await Chat.find();
    if (chats.length === 0) {
      res.status(205).send({
        message: 'no message',
      });
      return;
    }
    res.send(chats);
  }

  async createChat(req: Request, res: Response) {
    const { id, nickname, content } = req.body;

    const chat = new Chat({
      id,
      content,
      nickname,
    });
    const data = await chat.save();
    res.send(data);
  }
}

export default new chatController();
