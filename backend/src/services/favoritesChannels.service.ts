// types
import FavoriteChannel from '../models/FavoriteChannel';

const createFavoriteChannel =
  (model: typeof FavoriteChannel) =>
  (payload: { channel_id: string; follower_id: string; position: number }) => {
    const favoriteChannel = new model(payload);
    return favoriteChannel.save();
  };

const deleteFavoriteChannel =
  (model: typeof FavoriteChannel) => (payload: { channel_id: string }) => {
    console.log('payload: ', payload);
    return model.deleteOne(payload);
  };

// pas utilisé finalement puisque dans aggregation pipeline
const getCurrentUserFavoritesChannels =
  (model: typeof FavoriteChannel) => (payload: { user_id: string }) => {
    return model.find(payload);
  };

export default (model: typeof FavoriteChannel) => ({
  createFavoriteChannel: createFavoriteChannel(model),
  deleteFavoriteChannel: deleteFavoriteChannel(model),
  getCurrentUserFavoritesChannels: getCurrentUserFavoritesChannels(model),
});
