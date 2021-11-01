import { Schema, model } from 'mongoose';

const assetSchema = new Schema({
  crop_h: { type: Number, default: 0 },
  crop_y: { type: Number, default: 0 },
  crop_x: { type: Number, default: 0 },
  crop_w: { type: Number, default: 0 },
  has_embedded_player: { type: Boolean, default: false },
  title: { type: String, default: '' },
  position: { type: Number, default: 0 }, // ou bien faire quelque chose avec socket.io, à voir
  viewport_constraint_type: { type: String, default: 'constrained' },

  has_image: Boolean,
  asset_type: String,
  height: Number,
  width: Number,
  image_url: String,
});

export default model('asset', assetSchema);
