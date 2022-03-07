import { io, Socket } from 'socket.io-client';
import { SERVER_URL } from '../config';
import { SEND_MESSAGE } from './constant';
import { Message } from './type';

class SocketAPI {
  socket: Socket;

  constructor(server: string) {
    this.socket = io(server);
  }

  sendMessage(newMessage: Message) {
    this.socket.emit(SEND_MESSAGE, newMessage);
  }

  onEvent(msg: string, handler: any) {
    this.socket.on(msg, handler);
  }

  offEvent(msg: string, handler: any) {
    this.socket.off(msg, handler);
  }
}

export default new SocketAPI(SERVER_URL);
