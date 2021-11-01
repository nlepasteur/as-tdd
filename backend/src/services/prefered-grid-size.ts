import preferedGridSize from '../models/prefered-grid-size-model';

const createUserPreferedGridSize =
  (model: typeof preferedGridSize) =>
  async (required: { grid_size: string; user_id: string }) => {
    const preferedGridSize = new model(required);
    const response = await preferedGridSize.save();
    const formatted = {
      id: response._id,
      ...required,
    };
    return formatted;
  };

const getUserPreferedGridSize =
  (model: typeof preferedGridSize) => async (required: { user_id: string }) => {
    const response = await model.aggregate([
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
    ]);
    return response[0];
  };

const updateUserPreferedGridSize =
  (model: typeof preferedGridSize) =>
  async (required: { grid_size: string; user_id: string }) => {
    await model.updateOne(
      { user_id: required.user_id },
      { grid_size: required.grid_size }
    );
    const response = await model.aggregate([
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
    ]);
    return response;
  };

export default (model: typeof preferedGridSize) => ({
  createUserPreferedGridSize: createUserPreferedGridSize(model),
  getUserPreferedGridSize: getUserPreferedGridSize(model),
  updateUserPreferedGridSize: updateUserPreferedGridSize(model),
});
