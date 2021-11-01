// libs
import type { Dispatch, SetStateAction } from 'react';
// style
import './MediasMediumsToggleButton.css';

const MediasMediumsToggleButton = ({
  isOpen,
  setIsOpen,
  //   pickedMedias = '',
  //   pickedMediums = '',
  pickedCount = 0,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  //   pickedMedias: string;
  //   pickedMediums: string;
  pickedCount: number;
}) => {
  return (
    <button className="mm-dd__toggle-btn" onClick={() => setIsOpen(!isOpen)}>
      {pickedCount ? <span>{pickedCount}</span> : null}All Media
    </button>
  );
};

export default MediasMediumsToggleButton;
