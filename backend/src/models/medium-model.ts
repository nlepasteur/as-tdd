import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const mediumSchema = new Schema({
  _id: {
    type: String,
    default: nanoid(),
  },
  name: String,
  uri: String,
});

export default model('medium', mediumSchema);
