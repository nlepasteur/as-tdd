import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  adult_content: Boolean,
  comments_count: { type: Number, default: 0 },
  likes_count: { type: Number, default: 0 },
  views_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
  published_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
  suppressed: { type: Boolean, default: false },
  visible: { type: Boolean, default: true },

  description: String,
  user_id: String,
  asset_ids: [String],
  album_ids: [String],
  category_ids: [String],
  mediums: [String],
  software_ids: [String],
  tags: [String],
  permalink: String,
  /* NECESSAIRE POUR SHOWCASE MOSAIC */
  cover_asset_id: String, // transformé en => smaller_square_cover_url: String <= avec CDN transformation
  title: String,
  url: String,
  hide_as_adult: { type: Boolean, default: false },
  icons: {
    image: { type: Boolean, default: false },
    video: { type: Boolean, default: false },
    video_clip: { type: Boolean, default: false },
    model3d: { type: Boolean, default: false },
    marmoset: { type: Boolean, default: false },
    pano: { type: Boolean, default: false },
  },
});

export default model('project', projectSchema);
