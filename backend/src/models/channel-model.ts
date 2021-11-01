import { Schema, model } from 'mongoose';

const channelSchema = new Schema({
  image_url: { type: String, required: true },
  name: { type: String, required: true },
  uri: { type: String, required: true },
});

export default model('channel', channelSchema);
