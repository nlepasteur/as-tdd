export {};

declare global {
  type FetchStatus = 'init' | 'fetching' | 'failure' | 'success';

  type GetRequestStatus<S extends string> = `${Uppercase<S>}_${
    | 'INIT'
    | 'FETCHING'
    | 'FAILURE'
    | 'SUCCESS'}`;

  type FetchState<D> = {
    status: 'init' | 'fetching' | 'failure' | 'success';
    error: null | string;
    data: D[];
  };

  type FetchFetching<S extends string> = {
    type: Exclude<
      GetRequestStatus<S>,
      `${Uppercase<S>}_FAILURE` | `${Uppercase<S>}_SUCCESS`
    >;
  };

  type FetchFailure<S extends string> = {
    type: Exclude<
      GetRequestStatus<S>,
      | `${Uppercase<S>}_INIT`
      | `${Uppercase<S>}_FETCHING`
      | `${Uppercase<S>}_SUCCESS`
    >;
    payload: string;
  };

  type FetchSuccess<D, S extends string> = {
    type: Exclude<
      GetRequestStatus<S>,
      | `${Uppercase<S>}_INIT`
      | `${Uppercase<S>}_FETCHING`
      | `${Uppercase<S>}_FAILURE`
    >;
    payload: D[];
  };

  type FetchActions<D, S extends string> =
    | FetchFetching<S>
    | FetchFailure<S>
    | FetchSuccess<D, S>;

  interface GetFetching<S extends string> {
    (): FetchFetching<S>;
  }

  interface GetFailure<S extends string> {
    (payload: string): FetchFailure<S>;
  }

  interface GetSuccess<D, S extends string> {
    (payload: D[]): FetchSuccess<D, S>;
  }

  type GenericGetRequestStatus = 'INIT' | 'FETCHING' | 'FAILURE' | 'SUCCESS';

  type GenericFetchFetching = {
    type: Exclude<GenericGetRequestStatus, 'FAILURE' | 'SUCCESS'>;
  };

  type GenericFetchFailure = {
    type: Exclude<GenericGetRequestStatus, 'INIT' | 'FETCHING' | 'SUCCESS'>;
    payload: string;
  };

  type GenericFetchSuccess<D> = {
    type: Exclude<GenericGetRequestStatus, 'INIT' | 'FETCHING' | 'FAILURE'>;
    payload: D[];
  };

  type GenericFetchActions<D> =
    | GenericFetchFetching
    | GenericFetchFailure
    | GenericFetchSuccess<D>;

  interface GenericGetFetching {
    (): GenericFetchFetching;
  }

  interface GenericGetFailure {
    (payload: string): GenericFetchFailure;
  }

  interface GenericGetSuccess<D> {
    (payload: D[]): GenericFetchSuccess<D>;
  }

  type PartialFetchState = {
    status: FetchStatus;
    error: null | string;
  };

  type PartialFetchStateActions =
    | { type: 'FETCHING' }
    | { type: 'FAILURE'; payload: string }
    | { type: 'SUCCESS' };
}
