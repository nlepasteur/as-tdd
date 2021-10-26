// models
import Channel from '../models/Channel';
import FavoriteChannel from '../models/FavoriteChannel';
// services
import channelService from './channels.service';
import favoritesChannelsService from './favoritesChannels.service';

export default {
  channelService: channelService(Channel),
  favoritesChannelsService: favoritesChannelsService(FavoriteChannel),
};
