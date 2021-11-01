import albumModel from '../models/album-model';

const createAlbum =
  (model: typeof albumModel) =>
  (required: {
    user_id: string;
    title: string;
    projects_count: number;
    projects: [string];
  }) => {
    const album = new model(required);
    return album.save();
  };

const findAlbumByUserId =
  (model: typeof albumModel) => (required: { user_id: string }) => {
    return model.find(required);
  };

const deleteAlbum =
  (model: typeof albumModel) => (required: { id: string }) => {
    return model.deleteOne({
      _id: required.id,
    });
  };

module.exports = (model: typeof albumModel) => ({
  createAlbum: createAlbum(model),
  findAlbumByUserId: findAlbumByUserId(model),
  deleteAlbum: deleteAlbum(model),
});
