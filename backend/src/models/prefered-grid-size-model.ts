import { Schema, model } from 'mongoose';

const preferedGridSizeSchema = new Schema({
  user_id: { type: String, required: true },
  grid_size: { type: String, default: 'default', required: true },
});

export default model('prefered-grid-size', preferedGridSizeSchema);
