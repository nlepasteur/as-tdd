import {
  FetchMediumsActions,
  MediumsAction,
} from 'application/actions/mediums';

import { stringIntoArray } from 'utils/stringUtils';

export type Medium = {
  id: string;
  name: string;
  uri: string;
};

export type MediumsState = FetchState<Medium>;

const initialState = {
  status: 'init',
  error: null,
  data: [] as Medium[],
} as const;

const mediumsStateReducer = (
  state: MediumsState = initialState,
  action: FetchMediumsActions
): MediumsState => {
  switch (action.type) {
    case 'MEDIUMS_FETCHING':
      return { ...state, status: 'fetching', error: null, data: [] };
    case 'MEDIUMS_FAILURE':
      return { ...state, status: 'failure', error: action.payload, data: [] };
    case 'MEDIUMS_SUCCESS':
      return { ...state, status: 'success', error: null, data: action.payload };
    default:
      return state;
  }
};

const pickedMediumsReducer = (state = '', action: MediumsAction) => {
  switch (action.type) {
    case 'UPDATE_PICKED_MEDIUMS':
      const stateIntoArray = stringIntoArray(state);
      return !state.length
        ? action.payload
        : stateIntoArray.includes(action.payload)
        ? stateIntoArray.filter((media) => media !== action.payload).join(',')
        : `${state}, ${action.payload}`;
    case 'CLEAR_PICKED_MEDIUMS':
      return '';
    default:
      return state;
  }
};

export default {
  mediumsState: mediumsStateReducer,
  mediums: pickedMediumsReducer,
};
