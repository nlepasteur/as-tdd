import type { AdjustGrid } from '../actions/grid';

export type Grid = 'small' | 'large' | 'default';

const reducer = (state: Grid = 'default', action: AdjustGrid) => {
  switch (action.type) {
    case 'ADJUST_GRID':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
