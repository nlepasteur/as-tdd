import { Schema, model } from 'mongoose';

const categorieSchema = new Schema({
  description: String,
  example_images: [String],
  name: String,
  state: String,
  uri: String,
});

export default model('categorie', categorieSchema);
