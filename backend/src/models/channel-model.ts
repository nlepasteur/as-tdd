import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const channelSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  image_url: { type: String, required: true },
  name: { type: String, required: true },
  uri: { type: String, required: true },
});

export default model('channel', channelSchema);
