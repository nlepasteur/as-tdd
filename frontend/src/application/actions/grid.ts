// types
import type { ThunkAction } from 'redux-thunk';
import type { AnyAction } from 'redux';
import type { RootState } from 'application/store';
import type { Grid } from '../reducers/grid';

export const adjustGrid = (payload: Grid) =>
  ({
    type: 'ADJUST_GRID',
    payload,
  } as const);

export const getUserPreferenceGrid =
  (): ThunkAction<void, RootState, null, AnyAction> => (dispatch) => {
    try {
      (async function () {
        // const response = await fetch("");
        // dispatch(adjustGrid(response));
        dispatch(adjustGrid('default'));
        // prévoir le fait que devra être store dans local storage
      })();
    } catch (error) {
      dispatch(adjustGrid('default'));
    }
  };

// export const postUserPreferenceGrid =
//   (adjustment: Grid): ThunkAction<void, RootState, null, AnyAction> =>
//   (dispatch) => {
//     dispatch(adjustGrid(adjustment));
//     try {
//       (async function () {
//         const response = await fetch(
//           'http://localhost:8080/channels/favorites/add',
//           {
//             method: 'POST',
//             headers: {
//               Accept: 'application/json',
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ grid: adjustment }),
//           }
//         );
//         dispatch(adjustGrid())
//       })();
//     } catch (error) {
//       dispatch(adjustGrid(adjustment));
//     }
//   };

export type AdjustGrid = ReturnType<typeof adjustGrid>;
