import type { RootState } from 'application/store';
import type { ProjectsState } from 'application/reducers/projects';

export const getProjects = (state: RootState): ProjectsState => state.projects;
