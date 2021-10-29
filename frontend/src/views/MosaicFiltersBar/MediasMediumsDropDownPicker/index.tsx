// types
import type { Media as MediaType } from 'application/reducers/medias';
import type { Medium as MediumType } from 'application/reducers/mediums';
// components
import withState from './withState';
import withSetters from './withSetters';
import MediasMediumsList from './MediasMediumsList';
import Media from './Media';
import Medium from './Medium';
// store utils
// medias
import { getPickedMedias } from 'application/selectors/medias';
import { updatePickedMedias } from 'application/actions/medias';
// mediums
import { updatePickedMediums, getMediums } from 'application/actions/mediums';
import {
  getPickedMediums,
  getMediumsState,
} from 'application/selectors/mediums';

const mediasDi = {
  target: 'medias' as const,
  getPicked: getPickedMedias,
  updateAction: updatePickedMedias,
};

export const MediasList = withState<MediaType, 'medias'>(mediasDi)(
  withSetters<MediaType, 'medias'>(mediasDi)(MediasMediumsList(Media))
);

const mediumsDi = {
  target: 'mediums' as const,
  updateAction: updatePickedMediums,
  getPicked: getPickedMediums,
  getFetchState: getMediums,
  getStored: getMediumsState,
};

export const MediumsList = withState(mediumsDi)(
  withSetters<MediumType, 'mediums'>(mediumsDi)(MediasMediumsList(Medium))
);
