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

export default roomSchema;
