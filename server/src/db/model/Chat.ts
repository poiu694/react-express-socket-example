import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  id: String,
  nickname: String,
  content: String,
});

const Chat = mongoose.model('chat', chatSchema);

export default Chat;
