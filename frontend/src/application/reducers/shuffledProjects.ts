import type { Project } from '@api';
import type { ShuffledProjectsActions } from '../actions/shuffledProjects';

const reducer = (state: Project[] = [], action: ShuffledProjectsActions) => {
  switch (action.type) {
    case 'SET_SHUFFLED_PROJECTS':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
