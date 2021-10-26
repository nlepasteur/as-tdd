// libraries
import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const favoriteChannelSchema = new Schema<{
  _id: string;
  follower_id: string;
  channel_id: string;
  position: number;
}>({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  follower_id: { type: String, required: true },
  channel_id: { type: String, required: true },
  position: { type: Number, required: true },
});

export default model('favorite', favoriteChannelSchema);
