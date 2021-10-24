// components
import ChannelsDropDownContainer from './ChannelsDropDownContainer';
import withChannelsSetters from '../withChannelsSetters';
import withChannelsState, { connector } from '../withChannelsState';

export default connector(
  withChannelsState(withChannelsSetters(ChannelsDropDownContainer))
);
