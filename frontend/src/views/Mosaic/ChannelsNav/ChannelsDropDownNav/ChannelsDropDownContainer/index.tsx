// types
import type { ChangeEventHandler } from 'react';
import type { Channel } from '@api';
import type { OwnProps as PropsDefinedInChannelsSetters } from '../../withChannelsSetters';
// libraries
import { useState } from 'react';
// components
import ChannelsList from '../ChannelsList';
// style
import './ChannelsDropDownContainer.css';

type Props = {
  isLogged: boolean;
  fetchStatus: FetchStatus;
  error: null | string;
  channels: Channel[];
  followedLength: number;
} & PropsDefinedInChannelsSetters;

const ChannelsDropDownContainer = ({
  fetchStatus,
  error,
  isLogged,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const reorderChannels = (channels: string[]) => {
    console.log('yoyo');
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="channelsdd">
      <button
        className="channelsdd__btn"
        onClick={() => setIsOpen(!isOpen)}
        disabled={fetchStatus !== 'success'}
      >
        Channels
      </button>
      {isOpen && (
        <div className="channelsdd__menu-container">
          <div className="channelsdd__menu">
            <div>Explore</div>
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
        </div>
      )}
    </div>
  );
};

export default ChannelsDropDownContainer;