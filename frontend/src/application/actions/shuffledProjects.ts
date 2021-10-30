import type { Project } from '@api';

export const setShuffledProjects = (payload: Project[]) =>
  ({
    type: 'SET_SHUFFLED_PROJECTS',
    payload,
  } as const);

export type ShuffledProjectsActions = ReturnType<typeof setShuffledProjects>;
