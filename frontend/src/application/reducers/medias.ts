// types
import type { MediasActions } from '../actions/medias';
// utils
import { stringIntoArray } from 'utils/stringUtils';

export type Media = { name: string };

const pickedMediasReducer = (state = '', action: MediasActions) => {
  switch (action.type) {
    case 'UPDATE_PICKED_MEDIAS':
      const stateIntoArray = stringIntoArray(state);
      return !state.length
        ? action.payload
        : stateIntoArray.includes(action.payload)
        ? stateIntoArray.filter((media) => media !== action.payload).join(',')
        : `${state}, ${action.payload}`;
    case 'CLEAR_PICKED_MEDIAS':
      return '';
    default:
      return state;
  }
};

export default pickedMediasReducer;
