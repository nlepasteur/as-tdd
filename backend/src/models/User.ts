// types
import type { User } from '@api';
// libraries
import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const userSchema = new Schema<Omit<User, 'id'> & { _id: string }>({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // followed_channels: { type: [String], default: [] },
});

export default model('user', userSchema);
