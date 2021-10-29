// types
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { RootState } from '../store';
import type { Medium } from '../reducers/mediums';

export const getMediumsFetching: GetFetching<'mediums'> = () => {
  return {
    type: 'MEDIUMS_FETCHING',
  };
};

export const getMediumsFailure: GetFailure<'mediums'> = (payload: string) => {
  return {
    type: 'MEDIUMS_FAILURE',
    payload,
  };
};

export const getMediumsSuccess: GetSuccess<Medium, 'mediums'> = (
  payload: Medium[]
) =>
  ({
    type: 'MEDIUMS_SUCCESS',
    payload,
  } as const);

export const getMediums =
  (): ThunkAction<void, RootState, null, AnyAction> => (dispatch) => {
    // dispatch(getMediumsFetching());
    try {
      (async function () {
        // const response = await fetch("");
        // dispatch(getMediumsSuccess(await response?.json()));
        dispatch(
          getMediumsSuccess([
            {
              id: '0',
              name: 'medium1',
              uri: '',
            },
            {
              id: '1',
              name: 'medium2',
              uri: '',
            },
            {
              id: '2',
              name: 'medium3',
              uri: '',
            },
          ])
        );
      })();
    } catch (error) {
      console.log('error: ', error);
      // dispatch(getMediumsFailure(error.message));
    }
  };

export const updatePickedMediums = (payload: string) =>
  ({
    type: 'UPDATE_PICKED_MEDIUMS',
    payload,
  } as const);

export const clearPickedMediums = () =>
  ({
    type: 'CLEAR_PICKED_MEDIUMS',
  } as const);

export type MediumsAction =
  | ReturnType<typeof updatePickedMediums>
  | ReturnType<typeof clearPickedMediums>;

export type FetchMediumsActions = FetchActions<Medium, 'mediums'>;
