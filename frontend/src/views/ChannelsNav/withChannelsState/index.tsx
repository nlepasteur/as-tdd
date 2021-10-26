// types
import type { ComponentType, Dispatch, SetStateAction } from 'react';
import type { RootState } from 'application/store';
import type { Channel } from '@api';
// libraries
import { useState, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

const initialState: FetchState<Channel> = {
  status: 'init',
  error: null,
  data: [],
};

function reducer(
  state: FetchState<Channel> = initialState,
  action: GenericFetchActions<Channel>
): FetchState<Channel> {
  switch (action.type) {
    case 'FETCHING':
      return { status: 'fetching', error: null, data: [] };
    case 'FAILURE':
      return { status: 'failure', error: action.payload, data: [] };
    case 'SUCCESS':
      return { status: 'success', error: null, data: action.payload };
    default:
      return state;
  }
}

const mapState = ({ isLogged }: RootState) => ({
  isLogged,
});

export const connector = connect(mapState);

type PropsFromRedux = ReturnType<typeof mapState>;

export type WithChannelsStateProps = PropsFromRedux & {
  fetchStatus: FetchStatus;
  error: null | string;
  channels: Channel[];
  followedLength: number;
  setFollowedLength: Dispatch<SetStateAction<number>>;
};

const withChannelsState = (
  Component: ComponentType<WithChannelsStateProps>
) => {
  function WithChannelsState(props: PropsFromRedux) {
    const [{ status, error, data }, dispatch] = useReducer(
      reducer,
      initialState
    );
    const [followedLength, setFollowedLength] = useState(
      data.filter((channel) => channel.favorite_position !== null).length
    );
    console.log('status:', status);
    useEffect(() => {
      (async function () {
        try {
          dispatch({ type: 'FETCHING' });
          const response = await fetch('http://localhost:8080/channels');
          const payload = await response.json();
          dispatch({ type: 'SUCCESS', payload: payload.data });
        } catch (e) {
          dispatch({ type: 'FAILURE', payload: e.message });
        }
      })();
    }, [followedLength]);

    return (
      <Component
        fetchStatus={status}
        error={error}
        channels={data}
        followedLength={followedLength}
        setFollowedLength={setFollowedLength}
        {...props}
      />
    );
  }
  const wrappedComponentName =
    Component.displayName || Component.name || 'Component';
  WithChannelsState.displayName = `withChannelsState(${wrappedComponentName})`;

  return WithChannelsState;
};

export default withChannelsState;
