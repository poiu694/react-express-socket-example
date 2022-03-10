import mongoose from 'mongoose';

class DBConfig {
  mongoAPI: string;

  constructor(mongoAPI: string) {
    this.mongoAPI = mongoAPI;
  }

  connectMongoDB() {
    mongoose.connect(this.mongoAPI);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('db connected');
    });
  }
}

export default new DBConfig(process.env.MONGOOSE_URI);
