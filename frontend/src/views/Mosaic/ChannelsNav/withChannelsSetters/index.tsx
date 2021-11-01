// types
import type { ComponentType, Dispatch } from 'react';
import type { WithChannelsStateProps } from '../withChannelsState';

export type OwnProps = {
  followChannel: (
    dispatch: Dispatch<PartialFetchStateActions>
  ) => (payload: { channel_id: string; position: number }) => Promise<void>;
  unfollowChannel: (
    dispatch: Dispatch<PartialFetchStateActions>
  ) => (payload: { channel_id: string }) => Promise<void>;
};

type WithChannelsSettersProps = WithChannelsStateProps & OwnProps;

const withChannelsSetters = (
  Component: ComponentType<Omit<WithChannelsSettersProps, 'setFollowedLength'>>
) => {
  function WithChannelsSetters({
    setFollowedLength,
    ...WithChannelsStateProps
  }: WithChannelsStateProps) {
    const setters: Pick<
      WithChannelsSettersProps,
      'followChannel' | 'unfollowChannel'
    > = {
      followChannel:
        (dispatch: Dispatch<PartialFetchStateActions>) => async (payload) => {
          try {
            dispatch({ type: 'FETCHING' });
            const response = await fetch(
              'http://localhost:8080/channels/favorites/add',
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              }
            );
            response.ok && dispatch({ type: 'SUCCESS' });
            setFollowedLength(WithChannelsStateProps.followedLength + 1);
          } catch (e) {
            dispatch({ type: 'FAILURE', payload: e.message });
          }
        },

      unfollowChannel:
        (dispatch: Dispatch<PartialFetchStateActions>) => async (payload) => {
          try {
            dispatch({ type: 'FETCHING' });
            const response = await fetch(
              'http://localhost:8080/channels/favorites/remove',
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              }
            );
            response.ok && dispatch({ type: 'SUCCESS' });
            setFollowedLength(WithChannelsStateProps.followedLength - 1);
          } catch (e) {
            dispatch({ type: 'FAILURE', payload: e.message });
          }
        },
    };

    return <Component {...WithChannelsStateProps} {...setters} />;
  }

  const wrappedComponentName =
    Component.displayName || Component.name || 'Component';
  WithChannelsSetters.displayName = `withChannelsSetters(${wrappedComponentName})`;

  return WithChannelsSetters;
};

export default withChannelsSetters;
