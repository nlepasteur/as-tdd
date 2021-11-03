import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const preferedChannelSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  follower_id: { type: String, required: true },
  channel_id: { type: String, required: true },
  position: { type: Number, required: true },
});

export default model('prefered-channel', preferedChannelSchema);
