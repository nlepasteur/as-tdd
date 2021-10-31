// models
import Channel from '../models/Channel';
import FavoriteChannel from '../models/FavoriteChannel';
import GridSizePreference from '../models/GridSizePreference';
// services
import channelService from './channels.service';
import favoritesChannelsService from './favoritesChannels.service';
import preferedGridSizeService from './preferedGridSize.service';

export default {
  channelService: channelService(Channel),
  favoritesChannelsService: favoritesChannelsService(FavoriteChannel),
  preferedGridSizeService: preferedGridSizeService(GridSizePreference),
};
