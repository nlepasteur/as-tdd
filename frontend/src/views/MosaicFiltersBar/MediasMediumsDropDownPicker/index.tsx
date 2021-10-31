// types
import type { Dispatch, SetStateAction } from 'react';
import type { Media as MediaType } from 'application/reducers/medias';
import type { Medium as MediumType } from 'application/reducers/mediums';
// libs
import { useState } from 'react';
// store utils
import { useAppDispatch, useAppSelector } from 'application/hooks';
// medias
import { getPickedMedias } from 'application/selectors/medias';
import {
  updatePickedMedias,
  clearPickedMedias,
} from 'application/actions/medias';
// mediums
import {
  updatePickedMediums,
  getMediums,
  clearPickedMediums,
} from 'application/actions/mediums';
import {
  getPickedMediums,
  getMediumsState,
} from 'application/selectors/mediums';
// utils
import updateLocalStorage from 'utils/updateLocalStorage';
import { stringIntoArray } from 'utils/stringUtils';
// components
import withState from './withState';
import withSetters from './withSetters';
import MediasMediumsList from './MediasMediumsList';
import Media from './Media';
import Medium from './Medium';

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

const MediasMediumsDropDownPickerButton = ({
  isOpen,
  setIsOpen,
  pickedMedias = '',
  pickedMediums = '',
  pickedCount = 0,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pickedMedias: string;
  pickedMediums: string;
  pickedCount: number;
}) => {
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {pickedCount ? <span>{pickedCount}</span> : null}All Media
    </button>
  );
};

const MediasMediumsDropDownPickerClear = () => {
  const dispatch = useAppDispatch();
  const clear = () => {
    dispatch(clearPickedMedias());
    dispatch(clearPickedMediums());
    updateLocalStorage('medias', '');
    updateLocalStorage('mediums', '');
  };
  return <button onClick={clear}>Clear</button>;
};

const MediasMediumsDropDownPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pickedMedias = useAppSelector(getPickedMedias);
  const pickedMediums = useAppSelector(getPickedMediums);
  const pickedCount =
    stringIntoArray(pickedMedias).length +
    stringIntoArray(pickedMediums).length;

  return (
    <div>
      <div>
        {pickedCount && <MediasMediumsDropDownPickerClear />}
        <MediasMediumsDropDownPickerButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          pickedMedias={pickedMedias}
          pickedMediums={pickedMediums}
          pickedCount={pickedCount}
        />
      </div>
      {isOpen && (
        <div>
          <MediasMediumsDropDownPickerClear />
          <MediasList data={[{ name: 'media 1' }, { name: 'media 2' }]} />
          <MediumsList />
        </div>
      )}
    </div>
  );
};

export default MediasMediumsDropDownPicker;
