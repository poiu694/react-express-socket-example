import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  socketId: {
    type: String,
    required: true,
  },
  nickname: String,
});

export default userSchema;
