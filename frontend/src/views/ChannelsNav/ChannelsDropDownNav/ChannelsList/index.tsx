// types
import type { Channel } from '@api';
import type { OwnProps as PropsDefinedInChannelsSetters } from '../../withChannelsSetters';
// libraries
import { useState } from 'react';
import classnames from 'classnames';
// utils
import createClasses from 'utils/createClasses';
// components
import ChannelItem from '../ChannelItem';
// style
import './ChannelsList.css';

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
  followedLength,
  followChannel,
  unfollowChannel,
  searchBarInputValue,
  ...props
}: Omit<
  ChannelsListProps,
  'queryResultChannels' | 'followedChannels' | 'allChannels'
> & {
  queryResultChannels?: boolean;
  followedChannels?: boolean;
  allChannels?: boolean;
}) => {
  const [allChannelsIsOpen, setAllChannelsIsOpen] = useState(true);
  const channelsToDisplay = props.queryResultChannels
    ? channels.filter((channel) =>
        RegExp(searchBarInputValue as string).test(channel.name)
      )
    : props.followedChannels
    ? channels
        .filter((channel) => channel.favorite_position !== null)
        .sort(
          (a, b) =>
            (a.favorite_position as number) - (b.favorite_position as number)
        )
    : channels;
  return (
    <>
      {props.queryResultChannels ? (
        <div>
          {`${
            channelsToDisplay.filter((channel) =>
              RegExp(searchBarInputValue as string).test(channel.name)
            ).length
          } results`}
        </div>
      ) : props.followedChannels ? (
        <div>Channels you follow</div>
      ) : (
        <button onClick={() => setAllChannelsIsOpen(!allChannelsIsOpen)}>
          All channels
        </button>
      )}
      {((props.allChannels && allChannelsIsOpen) ||
        props.queryResultChannels ||
        props.followedChannels) && (
        <ul
          className={classnames(
            'channels-list',
            createClasses(
              props as { [key: string]: boolean },
              'channels-list--'
            )
          )}
        >
          {channelsToDisplay.map((channel) => (
            <li
              className="channels-list__item"
              key={`${channel.id}${
                props.queryResultChannels
                  ? 'qrc'
                  : props.followedChannels
                  ? 'fc'
                  : 'a'
              }`}
            >
              <ChannelItem
                channel={channel}
                followedLength={followedLength}
                followChannel={followChannel}
                unfollowChannel={unfollowChannel}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ChannelsList;
