import { Schema, model } from 'mongoose';

const mediumSchema = new Schema({
  name: String,
  uri: String,
});

export default model('medium', mediumSchema);
