import { Schema, model } from 'mongoose';

const softwareSchema = new Schema({
  icon_default_url: String,
  icon_url: String,
  name: String,
});

export default model('software', softwareSchema);
