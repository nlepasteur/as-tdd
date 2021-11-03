// types
import type { Media as MediaType } from 'application/reducers/medias';
import type { Medium as MediumType } from 'application/reducers/mediums';
// libs
import { useState } from 'react';
// store utils
import { useAppSelector } from 'application/hooks';
// medias
import { getPickedMedias } from 'application/selectors/medias';
import { updatePickedMedias } from 'application/actions/medias';
// mediums
import { updatePickedMediums, getMediums } from 'application/actions/mediums';
import {
  getPickedMediums,
  getMediumsState,
} from 'application/selectors/mediums';
import { stringIntoArray } from 'utils/stringUtils';
// components
import withState from './withState';
import withSetters from './withSetters';
import MediasMediumsList from './MediasMediumsList';
import Media from './Media';
import Medium from './Medium';
import MediasMediumsToggleButton from './MediasMediumsToggleButton';
import MediasMediumsClearButton from './MediasMediumsClearButton';
import DimensionPicker from '../DimensionPicker';
// style
import './MediasMediumsDropDownPicker.css';

const mediasDi = {
  target: 'medias' as const,
  getPicked: getPickedMedias,
  updateAction: updatePickedMedias,
};

const MediasList = withState<MediaType, 'medias'>(mediasDi)(
  withSetters<MediaType, 'medias'>(mediasDi)(MediasMediumsList(Media))
);

const mediumsDi = {
  target: 'mediums' as const,
  updateAction: updatePickedMediums,
  getPicked: getPickedMediums,
  getFetchState: getMediums,
  getStored: getMediumsState,
};

const MediumsList = withState(mediumsDi)(
  withSetters<MediumType, 'mediums'>(mediumsDi)(MediasMediumsList(Medium))
);

const MediasMediumsDropDownPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pickedMedias = useAppSelector(getPickedMedias);
  const pickedMediums = useAppSelector(getPickedMediums);
  const pickedCount =
    stringIntoArray(pickedMedias).length +
    stringIntoArray(pickedMediums).length;
  return (
    <div className="mm-dd">
      <div>
        {pickedCount && <MediasMediumsClearButton btnLocation="outside" />}
        <MediasMediumsToggleButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pickedCount={pickedCount}
        />
      </div>
      {isOpen && (
        <div className="mm-dd__menu">
          {pickedCount > 0 && (
            <>
              <MediasMediumsClearButton btnLocation="inside" />
              <div className="mm-dd__separation mm-dd__separation--clear-btn" />
            </>
          )}
          <DimensionPicker btnLocation="inside" />
          <div className="mm-dd__separation mm-dd__separation--dimension-picker" />
          <span className="mm-dd__list-title">MEDIUMS</span>
          <MediumsList />
          <div className="mm-dd__separation " />
          <span className="mm-dd__list-title">ONLY SHOW PROJECTS WITH:</span>
          <MediasList
            data={[
              {
                name: 'marmoset viewer',
                as_query: 'marmoset',
              },
              {
                name: 'sketchfab',
                as_query: 'sketchfab',
              },
              {
                name: 'video clip',
                as_query: 'video_clip',
              },
              {
                name: 'video',
                as_query: 'video',
              },
              {
                name: '360 panos',
                as_query: 'pano',
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default MediasMediumsDropDownPicker;
