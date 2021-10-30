// types
import type { Project } from '@api';
import type { ProjectsActions } from '../actions/projects';

export type ProjectsState = FetchState<Project>;

const initialState = {
  status: 'init',
  error: null,
  data: [] as Project[],
} as const;

const reducer = (
  state: ProjectsState = initialState,
  action: ProjectsActions
) => {
  switch (action.type) {
    case 'PROJECTS_FETCHING':
      return {
        status: 'fetching',
        error: null,
        data: state.data,
      };
    case 'PROJECTS_FAILURE':
      return {
        status: 'failure',
        error: action.payload,
        data: [],
      };
    case 'PROJECTS_SUCCESS':
      return {
        status: 'success',
        error: null,
        data: [...state.data, ...action.payload],
      };
    case 'CLEAR_PROJECTS':
      return {
        status: 'init',
        error: null,
        data: [],
      };
    default:
      return state;
  }
};

export default reducer;
