// types
import { GridSizePreference } from '../../../types';
// libs
import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const gridSizePreferenceSchema = new Schema<
  Omit<GridSizePreference, 'id'> & { _id: string }
>({
  _id: {
    type: String,
    default: nanoid(),
  },
  user_id: { type: String, required: true },
  grid_size: { type: String, default: 'default', required: true },
});

export default model('gridsizepreference', gridSizePreferenceSchema);
