// types
import type { MouseEventHandler } from 'react';
import type { Channel } from '@api';
import type { OwnProps as PropsDefinedInChannelsSetters } from '../../withChannelsSetters';
// libraries
import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
// icons
import { BiGridVertical } from 'react-icons/bi';
import { FiCheck } from 'react-icons/fi';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';
// style
import './ChannelItem.css';

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

  const handleFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.channel.favorite_position !== null
      ? props.unfollowChannel(dispatch)({ channel_id: props.channel.id })
      : props.followChannel(dispatch)({
          channel_id: props.channel.id,
          position: props.followedLength,
        });
  };

  return (
    <Link to={`/channels/${props.channel.uri}`}>
      <div
        className={classnames(
          'channel-grid',
          props.channel.favorite_position !== null && 'channel-grid--followed'
        )}
      >
        <img
          src={props.channel.image_url}
          alt={props.channel.name}
          className="channel-grid__item"
        />
        <div className="channel-grid__item channel-overlay">
          <div className="channel-overlay__move">
            <BiGridVertical />
          </div>
          <div className="channel-overlay__name">{props.channel.name}</div>
          <button
            className={classnames(
              'channel-overlay__follow',
              status === 'fetching' && 'channel-overlay__follow--fetching'
            )}
            onClick={handleFollow}
          >
            <div className="follow-status follow-status__followed">
              <FiCheck />
            </div>
            <div className="follow-status follow-status__unfollow">
              <IoCloseOutline />
            </div>
            <div className="follow-status follow-status__follow">
              <HiOutlinePlus />
            </div>
            <div className="follow-status follow-status__fetching">F!</div>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ChannelItem;
