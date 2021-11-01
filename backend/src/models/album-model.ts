import { Schema, model } from 'mongoose';

const albumSchema = new Schema({
  user_id: String,
  title: String,
  projects_count: Number,
  projects: [String],
});

export default model('album', albumSchema);
