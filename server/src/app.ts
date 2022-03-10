import cors = require('cors');
import express from 'express';
import * as http from 'http';

import rootRouter from './routes';
import DBConfig from './db';
import SocketAPI from './socket';

export default class App {
  app: express.Application;
  port: string;
  server: http.Server;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';
    this.config();
    this.middleware();
    this.route();
  }

  private config() {
    this.app.use(express.json()); // json parsing
    this.app.use(express.urlencoded({ extended: false })); // body parsing
    DBConfig.connectMongoDB();
  }

  private middleware() {
    const corsOption = {
      origin: process.env.FRONTEND_URI,
      credentials: true,
    };
    this.app.use(cors(corsOption));
  }

  private route() {
    this.app.use('/api', rootRouter);
  }

  listen() {
    this.server = this.app.listen(this.port, () => {
      console.log(`LISTEN ON PORT ${this.port}`);
    });

    const socket = new SocketAPI(this.server);
    socket.connectSocket();
  }
}
