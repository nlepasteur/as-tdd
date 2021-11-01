import assetModel from '../models/asset-model';

const createAsset = (model: typeof assetModel) => (required: { file: any }) => {
  const data = {
    // file from CDN
    has_image: required.file.resource_type === 'image',
    asset_type: required.file.resource_type,
    image_url: required.file.url,
    height: required.file.height,
    width: required.file.width,
  };
  const asset = new model(data);
  return asset.save();
};

const findOneAsset = (model: typeof assetModel) => (query: { id: string }) => {
  const asset = model.findOne({ _id: query.id });
  return asset;
};

const deleteOneAsset =
  (model: typeof assetModel) => (query: { id: string }) => {
    return model.deleteOne({ _id: query.id });
  };

const updateOneAsset =
  (model: typeof assetModel) => (query: { id: string }, update: any) => {
    return model.updateOne({ _id: query.id }, update);
  };

module.exports = (model: typeof assetModel) => ({
  createAsset: createAsset(model),
  findOneAsset: findOneAsset(model),
  deleteOneAsset: deleteOneAsset(model),
  updateOneAsset: updateOneAsset(model),
});
