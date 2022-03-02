import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Room = mongoose.model('room', roomSchema);

export default Room;
