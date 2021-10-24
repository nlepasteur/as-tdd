// types
import type { ChangeEventHandler } from 'react';
import type { Channel } from '@api';

export type Props = {
  channel: Channel;
  followedLength: number;
  followChannel: (payload: { channel_id: string; position: number }) => void;
  unfollowChannel: (payload: { channel_id: string }) => void;
};

const ChannelItem = (props: Props) => {
  const handleFollowUnfollow2: ChangeEventHandler<HTMLInputElement> = () => {
    props.channel.favorite_position !== null
      ? props.unfollowChannel({ channel_id: props.channel.id })
      : props.followChannel({
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
          onChange={handleFollowUnfollow2}
          checked={!!props.channel.favorite_position}
        />
      </label>
    </div>
  );
};

export default ChannelItem;
