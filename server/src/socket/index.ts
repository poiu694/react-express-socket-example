import { Server } from 'socket.io';
import * as http from 'http';

class SocketAPI {
  io: Server;

  constructor(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URI,
      },
    });
  }

  connectSocket() {
    this.io.on('connection', (socket) => {
      console.log('connected socket');
      socket.on('send message', (msg) => {
        console.log(msg);
        this.io.emit('chat message', msg);
      });
      socket.on('disconnect', () => {
        console.log('disconnected');
      });
    });
  }
}

export default SocketAPI;
