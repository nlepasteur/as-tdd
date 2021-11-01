import softwareModel from '../models/software-model';

const createSoftware =
  (model: typeof softwareModel) =>
  (required: { icon_default_url: string; icon_url: string; name: string }) => {
    const software = new model(required);
    return software.save();
  };

const getSoftwareByRegExp =
  (model: typeof softwareModel) => (required: { name: string }) => {
    const softwares = model.find({ name: new RegExp(required.name, 'i') });
    return softwares;
  };

module.exports = (model: typeof softwareModel) => ({
  createSoftware: createSoftware(model),
  getSoftwareByRegExp: getSoftwareByRegExp(model),
});
