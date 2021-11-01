// models
import channelModel from '../models/channel-model';
import preferedChannelModel from '../models/prefered-channel-model';
import GridSizePreference from '../models/prefered-grid-size-model';
import User from '../models/user-model';
import Project from '../models/project-model';
import mediumModel from '../models/medium-model';
import softwareModel from '../models/software-model';
// services
import channelsService from './channels-service';
import preferedChannelsService from './prefered-channels-service';
import preferedGridSizeService from './prefered-grid-size';
import userService from './user.service';
import projectsService from './projects.service';
import mediumsService from './mediums-service';
import softwaresService from './softwares-service';

export default {
  userService: userService(User),
  channelsService: channelsService(channelModel),
  preferedChannelsService: preferedChannelsService(preferedChannelModel),
  preferedGridSizeService: preferedGridSizeService(GridSizePreference),
  projectsService: projectsService(Project),
  mediumsService: mediumsService(mediumModel),
  softwaresService: softwaresService(softwareModel),
};
