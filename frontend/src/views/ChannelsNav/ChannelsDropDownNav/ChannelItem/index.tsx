// types
import type { ChangeEventHandler } from 'react';
import type { Channel } from '@api';
import type { OwnProps as PropsDefinedInChannelsSetters } from '../../withChannelsSetters';
// libraries
import { useReducer } from 'react';

export type ChannelItemProps = {
  channel: Channel;
  followedLength: number;
} & Omit<PropsDefinedInChannelsSetters, 'reorderChannels'>;

const initialState: PartialFetchState = {
  status: 'init',
  error: null,
};

const reducer = (
  state: PartialFetchState = initialState,
  action: PartialFetchStateActions
): PartialFetchState => {
  switch (action.type) {
    case 'FETCHING':
      return { status: 'fetching', error: null };
    case 'FAILURE':
      return { status: 'failure', error: action.payload };
    case 'SUCCESS':
      return { status: 'success', error: null };
    default:
      return state;
  }
};

const ChannelItem = (props: ChannelItemProps) => {
  const [{ status, error }, dispatch] = useReducer(reducer, initialState);

  const handleFollow: ChangeEventHandler<HTMLInputElement> = () => {
    props.channel.favorite_position !== null
      ? props.unfollowChannel(dispatch)({ channel_id: props.channel.id })
      : props.followChannel(dispatch)({
          channel_id: props.channel.id,
          position: props.followedLength,
        });
  };

  return (
    <div>
      <div>{props.channel.name}</div>
      <label>
        <input
          type="checkbox"
          onChange={handleFollow}
          checked={props.channel.favorite_position !== null}
        />
      </label>
    </div>
  );
};

export default ChannelItem;
