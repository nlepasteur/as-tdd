// types
import type { ComponentType } from 'react';
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { RootState } from 'application/store';
import type { AppThunkDispatch } from 'application/hooks';
// libraries
import { useEffect } from 'react';
// store utils
import { useAppDispatch, useAppSelector } from 'application/hooks';
// utils
import { stringIntoArray } from 'utils/stringUtils';

type FetchStatePartiallyOptional<T> = {
  [Prop in keyof FetchState<T>]?: FetchState<T>[Prop];
} & { data: T[] };

export type WrappedComponent<T> = {
  picked: string[];
  pick: (pickable: string) => void;
} & FetchStatePartiallyOptional<T>;

type DIDataFetched<T, S extends string> = {
  getFetchState: () => ThunkAction<void, RootState, null, AnyAction>;
  getStored: (state: RootState) => FetchState<T> | T[];
  getPicked: (state: RootState) => string;
  target: S;
  updateAction: (media: string) => {
    type: `UPDATE_PICKED_${Uppercase<S>}`;
    payload: string;
  };
};

type DIDataHardCoded<S extends string> = {
  getPicked: (state: RootState) => string;
  target: S;
  updateAction: (media: string) => {
    type: `UPDATE_PICKED_${Uppercase<S>}`;
    payload: string;
  };
};

type DI<T, S extends string> = {
  getFetchState?: () => ThunkAction<void, RootState, null, AnyAction>;
  getStored?: (state: RootState) => FetchState<T> | T[];
  getPicked: (state: RootState) => string;
  target: S;
  updateAction: (media: string) => {
    type: `UPDATE_PICKED_${Uppercase<S>}`;
    payload: string;
  };
};

type FOReturnType1<T> = (
  Component: ComponentType<Omit<WrappedComponent<T>, 'pick'>>
) => (props: Omit<{ data: T[] }, 'data'>) => JSX.Element;

type FOReturnType2<T> = (
  Component: ComponentType<Omit<WrappedComponent<T>, 'pick'>>
) => (props: { data: T[] }) => JSX.Element;

function withState<T, S extends string>(
  di: DIDataFetched<T, S>
): FOReturnType1<T>;
function withState<T, S extends string>(
  di: DIDataHardCoded<S>
): FOReturnType2<T>;
function withState<T, S extends string>(di: DI<T, S>) {
  return (Component: ComponentType<Omit<WrappedComponent<T>, 'pick'>>) => {
    function WithState(props: { data: T[] }): JSX.Element;
    function WithState(props: Omit<{ data: T[] }, 'data'>): JSX.Element;
    function WithState(props: { data?: T[] }) {
      const dispatch: AppThunkDispatch = useAppDispatch();
      const stored = di.getStored && useAppSelector(di.getStored);
      useEffect(() => {
        if (props.data) {
          return;
        }
        di.getFetchState && dispatch(di.getFetchState());
      }, [props.data, dispatch]);

      const picked = stringIntoArray(useAppSelector(di.getPicked));
      return props.data ? (
        <Component data={props.data} picked={picked} />
      ) : (
        <Component {...(stored as FetchState<T>)} picked={picked} />
      );
    }

    return di.getFetchState && di.getStored
      ? () => WithState({})
      : (props: { data: T[] }) => WithState(props);
  };
}

export default withState;
