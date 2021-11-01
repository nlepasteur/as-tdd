import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  is_plus_member: { type: Boolean, default: false },
  is_staff: { type: Boolean, default: false },
  pro_member: { type: Boolean, default: false },
  artist_role: { type: Boolean, default: false },
  followers_count: { type: Number, default: 0 },

  full_name: String,
  name: String,
  headline: String,
  city: String,
  country: String,
  location: String,
  large_avatar_url: String,
  medium_avatar_url: String,
  avatar_file_name: String,
  cover_file_name: String,
  default_cover_url: String,
  permalink: String,
  sample_projects: [String],
  skills: [{ name: String }],
  softwares: [{ name: String, icon_url: String }],
});

export default model('user', userSchema);
