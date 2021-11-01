import mediumModel from '../models/medium-model';

const createMedium =
  (model: typeof mediumModel) => (required: { name: string; uri: string }) => {
    const medium = new model(required);
    return medium.save();
  };

const getMediums = (model: typeof mediumModel) => () => {
  return model.find();
};

export default (model: typeof mediumModel) => ({
  createMedium: createMedium(model),
  getMediums: getMediums(model),
});
