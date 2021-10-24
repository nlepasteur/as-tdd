// types
import type { IsLoggedActions } from '../actions/isLogged';

const reducer = (state = true, action: IsLoggedActions) => {
  switch (action.type) {
    case 'IS_LOGGED':
      return true;
    default:
      return state;
  }
};

export default reducer;
