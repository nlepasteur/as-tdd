import mediumModel from '../models/medium-model';

const createMedium =
  (model: typeof mediumModel) => (required: { name: string; uri: string }) => {
    const medium = new model(required);
    return medium.save();
  };

const getMediums = (model: typeof mediumModel) => () => {
  // return model.find();
  return model.aggregate([
    {
      $set: {
        id: '$_id',
      },
    },
    {
      $project: {
        _id: 0,
        __v: 0,
      },
    },
  ]);
};

export default (model: typeof mediumModel) => ({
  createMedium: createMedium(model),
  getMediums: getMediums(model),
});
