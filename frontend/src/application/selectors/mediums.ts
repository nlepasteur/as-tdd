import { RootState } from '../store';

export const getMediumsState = (state: RootState) => state.mediumsState;

export const getPickedMediums = (state: RootState) => state.mediums;
