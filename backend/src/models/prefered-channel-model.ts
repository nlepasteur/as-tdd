import { Schema, model } from 'mongoose';

const preferedChannelSchema = new Schema({
  follower_id: { type: String, required: true },
  channel_id: { type: String, required: true },
  position: { type: Number, required: true },
});

export default model('prefered-channel', preferedChannelSchema);
