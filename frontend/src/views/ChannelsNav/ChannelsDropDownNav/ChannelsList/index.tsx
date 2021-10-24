// types
import type { Channel } from '@api';
import type { OwnProps as PropsDefinedInChannelsSetters } from '../../withChannelsSetters';
// libraries
import { useState } from 'react';
// components
import ChannelItem from '../ChannelItem';

type QueryResultChannels = {
  queryResultChannels: true;
  searchBarInputValue: string;
  followedChannels?: never;
  allChannels?: never;
};
type FollowedChannels = {
  queryResultChannels?: never;
  searchBarInputValue?: never;
  followedChannels: true;
  allChannels?: never;
};
type AllChannels = {
  queryResultChannels?: never;
  searchBarInputValue?: never;
  followedChannels?: never;
  allChannels: true;
};
type FiltredChannels = QueryResultChannels | FollowedChannels | AllChannels;

export type ChannelsListProps = {
  channels: Channel[];
  followedLength: number;
} & PropsDefinedInChannelsSetters &
  FiltredChannels;

const ChannelsList = ({
  channels,
  queryResultChannels,
  searchBarInputValue,
  followedChannels,
  allChannels,
  ...props
}: ChannelsListProps) => {
  const [allChannelsIsOpen, setAllChannelsIsOpen] = useState(true);
  const channelsToDisplay = queryResultChannels
    ? channels.filter((channel) =>
        RegExp(searchBarInputValue as string).test(channel.name)
      )
    : followedChannels
    ? channels.filter((channel) => channel.favorite_position !== null)
    : channels;
  return (
    <div>
      {queryResultChannels ? (
        <div>
          {`${
            channelsToDisplay.filter((channel) =>
              RegExp(searchBarInputValue as string).test(channel.name)
            ).length
          } results`}
        </div>
      ) : followedChannels ? (
        <div>Channels you follow</div>
      ) : (
        <button onClick={() => setAllChannelsIsOpen(!allChannelsIsOpen)}>
          All channels
        </button>
      )}
      {((allChannels && allChannelsIsOpen) ||
        queryResultChannels ||
        followedChannels) && (
        <ul>
          {channelsToDisplay.map((channel) => (
            <li
              key={`${channel.id}${
                queryResultChannels ? 'qrc' : followedChannels ? 'fc' : 'a'
              }`}
            >
              <ChannelItem channel={channel} {...props} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChannelsList;
