import dotenv from 'dotenv';
dotenv.config();

import cors = require('cors');
import express from 'express';
import mongoose from 'mongoose';

import rootRouter from './routes';
import { Server } from 'socket.io';

function connectDB() {
  mongoose.connect(process.env.MONGOOSE_URI);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => {
    console.log('db connected');
  });
}

export default class App {
  app: express.Application;
  port: string;
  server: any;

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
    connectDB();
  }

  private middleware() {
    const corsOption = {
      origin: 'http://localhost:3000',
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

    const io = new Server(this.server, {
      cors: {
        origin: 'http://localhost:3000',
      },
    });

    io.on('connection', (socket) => {
      console.log('connected socket');
      socket.on('send message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
      });
      socket.on('disconnect', () => {
        console.log('disconnected');
      });
    });
  }
}
