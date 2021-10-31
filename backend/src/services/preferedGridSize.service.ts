// types
import { GridSizePreference as GridSizePreferenceType } from '../../../types';
import type {
  GridSizePreferencePostBody,
  GridSizePreferencePatchBody,
} from '../../../types';
// model
import GridSizePreference from '../models/GridSizePreference';

const createUserPreferedGridSize =
  (model: typeof GridSizePreference) =>
  async (required: GridSizePreferencePostBody & { user_id: string }) => {
    const initialGridSizePreference = new model(required);
    const response = await initialGridSizePreference.save();
    const formatted = {
      id: response._id,
      ...required,
    };
    return formatted;
  };

const getUserPreferedGridSize =
  (model: typeof GridSizePreference) =>
  async (required: { user_id: string }) => {
    const response = (await model.aggregate([
      {
        $match: {
          user_id: required.user_id,
        },
      },
      {
        $set: {
          id: '$_id',
        },
      },
      {
        $unset: ['_id', '__v'],
      },
    ])) as GridSizePreferenceType[];
    return response[0];
  };

const updateUserPreferedGridSize =
  (model: typeof GridSizePreference) =>
  async (required: GridSizePreferencePatchBody & { user_id: string }) => {
    await model.updateOne(
      { user_id: required.user_id },
      { grid_size: required.grid_size }
    );
    const response = (await model.aggregate([
      {
        $match: {
          user_id: required.user_id,
        },
      },
      {
        $set: {
          id: '$_id',
        },
      },
      {
        $unset: ['_id', '__v'],
      },
    ])) as GridSizePreferenceType[];
    return response;
  };

export default (model: typeof GridSizePreference) => ({
  createUserPreferedGridSize: createUserPreferedGridSize(model),
  getUserPreferedGridSize: getUserPreferedGridSize(model),
  updateUserPreferedGridSize: updateUserPreferedGridSize(model),
});
