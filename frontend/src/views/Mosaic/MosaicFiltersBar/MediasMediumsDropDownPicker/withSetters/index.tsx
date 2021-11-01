// types
import type { ComponentType } from 'react';
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { RootState } from 'application/store';
// store utils
import { useAppDispatch } from 'application/hooks';
// utils
import { stringIntoArray } from 'utils/stringUtils';
import updateLocalStorage from 'utils/updateLocalStorage';

type FetchStatePartiallyOptional<T> = {
  [Prop in keyof FetchState<T>]?: FetchState<T>[Prop];
} & { data: T[] };

export type WrappedComponentProps<T> = {
  picked: string[];
  pick: (pickable: string) => void;
} & FetchStatePartiallyOptional<T>;

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

function withSetters<T, S extends string>(di: DI<T, S>) {
  return (Component: ComponentType<WrappedComponentProps<T>>) => {
    function WithSetters(props: Omit<WrappedComponentProps<T>, 'pick'>) {
      const dispatch = useAppDispatch();

      const pick = (pickable: string) => {
        const picked = localStorage.getItem(di.target);
        if (picked) {
          const parsedPickable = JSON.parse(picked);
          const pickableAlreadyStored =
            stringIntoArray(parsedPickable).includes(pickable);
          const pickableToAdd = pickableAlreadyStored
            ? stringIntoArray(parsedPickable).filter(
                (stored) => stored !== pickable
              ).length > 1
              ? stringIntoArray(parsedPickable)
                  .filter((stored) => stored !== pickable)
                  .join(',')
              : stringIntoArray(parsedPickable)
                  .filter((stored) => stored !== pickable)
                  .join('')
            : parsedPickable.length
            ? `${parsedPickable}, ${pickable}`
            : pickable;
          updateLocalStorage(di.target, pickableToAdd);
        } else {
          updateLocalStorage(di.target, pickable);
        }

        dispatch(di.updateAction(pickable) as any);
      };

      return <Component {...props} pick={pick} />;
    }
    const wrappedComponentName =
      Component.displayName || Component.name || 'Component';
    WithSetters.displayName = `withSetters(${wrappedComponentName})`;

    return WithSetters;
  };
}

export default withSetters;
