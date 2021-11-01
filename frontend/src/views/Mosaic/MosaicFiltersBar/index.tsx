// components
import DimensionPicker from './DimensionPicker';
import ExplorePicker from './ExplorePicker';
import GridAdjustment from './GridAdjustment';
import MediasMediumsDropDownPicker from './MediasMediumsDropDownPicker';
import ChannelsDropDownNav from '../ChannelsNav/ChannelsDropDownNav';
// style
import './MosaicFiltersBar.css';

const MosaicFiltersBar = () => (
  <div className="mosaic-filters-bar">
    <div
      style={{
        gridArea: 'channelsnav',
        color: '#fff',
      }}
    >
      channels carousel navbar
    </div>
    <ChannelsDropDownNav />
    <ExplorePicker />
    <DimensionPicker btnLocation="outside" />
    <GridAdjustment />
    <MediasMediumsDropDownPicker />
  </div>
);

export default MosaicFiltersBar;
