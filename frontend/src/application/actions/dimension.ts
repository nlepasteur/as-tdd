import type { Dimension } from '../reducers/dimension';

export type DimensionActions = {
  type: 'SET_DIMENSION';
  payload: Dimension;
};
// export type DimensionActions = `SET_${Uppercase<string & Dimension>}`;

export const setDimension = (payload: Dimension) => ({
  type: 'SET_DIMENSION',
  payload,
});
