import type { DimensionActions } from '../actions/dimension';

const dimensions = ['all', '2d', '3d'] as const;

export type Dimension = typeof dimensions[number];

export default (state: Dimension = 'all', action: DimensionActions) => {
  switch (action.type) {
    case 'SET_DIMENSION':
      return action.payload;
    default:
      return state;
  }
};
