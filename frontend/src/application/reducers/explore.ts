import { ExploreActions } from '../actions/explore';

export type Explore = 'community' | 'trending' | 'latest' | 'following';

const reducer = (state: Explore = 'community', action: ExploreActions) => {
  switch (action.type) {
    case 'SET_EXPLORE':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
