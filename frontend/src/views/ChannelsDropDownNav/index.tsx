// types
import type { ChangeEventHandler } from 'react';
import type { Channel } from '@api';
// libraries
import { useState } from 'react';
// components
import ChannelsList from './ChannelsList';

type Props = {
  isLogged: boolean;
  fetchStatus: FetchStatus;
  error: null | string;
  channels: Channel[];
  followedLength: number;
  followChannel: (payload: { channel_id: string; position: number }) => void;
  unfollowChannel: (payload: { channel_id: string }) => void;
  reorderChannels: (payload: string[]) => void;
};

const ChannelsDropDownNav = ({
  fetchStatus,
  error,
  isLogged,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={fetchStatus !== 'success'}
      >
        Channels
      </button>
      {isOpen && (
        <div>
          <input onChange={handleInputChange} value={inputValue} />
          {inputValue && (
            <ChannelsList
              {...props}
              queryResultChannels
              searchBarInputValue={inputValue}
            />
          )}
          {isLogged && <ChannelsList {...props} followedChannels />}
          <ChannelsList {...props} allChannels />
        </div>
      )}
    </div>
  );
};

export default ChannelsDropDownNav;
