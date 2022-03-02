import dotenv from 'dotenv';
dotenv.config();

import cors = require('cors');
import express from 'express';
import mongoose from 'mongoose';

import rootRouter from './routes';

mongoose.connect(process.env.MONGOOSE_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('db connected');
});

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
  }
}
