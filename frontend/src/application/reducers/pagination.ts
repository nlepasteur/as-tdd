import type { PaginationAction } from '../actions/pagination';

const reducer = (state = 1, action: PaginationAction) => {
  switch (action.type) {
    case 'INCREMENT_PAGINATION':
      return state + 1;
    case 'RESET_PAGINATION':
      return 1;
    default:
      return state;
  }
};

export default reducer;
