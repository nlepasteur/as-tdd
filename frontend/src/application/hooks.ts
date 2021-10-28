// types
import { AnyAction } from 'redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState, AppDispatch } from './store';
// libraries
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
