// libs
import classnames from 'classnames';
// store utils
import { useAppDispatch } from 'application/hooks';
import { clearPickedMedias } from 'application/actions/medias';
import { clearPickedMediums } from 'application/actions/mediums';
import { clearProjects } from 'application/actions/projects';
// utils
import updateLocalStorage from 'utils/updateLocalStorage';
// style
import './MediasMediumsClearButton.css';

const MediasMediumsDropDownClearButton = ({
  btnLocation,
}: {
  btnLocation: 'inside' | 'outside';
}) => {
  const dispatch = useAppDispatch();
  const clear = () => {
    dispatch(clearProjects());
    dispatch(clearPickedMedias());
    dispatch(clearPickedMediums());
    updateLocalStorage('medias', '');
    updateLocalStorage('mediums', '');
  };
  return (
    <button
      className={classnames(
        'mm-dd__clear-btn',
        `mm-dd__clear-btn--${btnLocation}`
      )}
      onClick={clear}
    >
      Clear
    </button>
  );
};

export default MediasMediumsDropDownClearButton;
