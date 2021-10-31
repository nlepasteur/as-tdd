// libraries
import { Provider } from 'react-redux';
// store utils
import store from 'application/store';
// style
import './App.css';
// test!!!
import ChannelsDropDownNav from 'views/ChannelsNav/ChannelsDropDownNav';
import DimensionPicker from 'views/MosaicFiltersBar/DimensionPicker';
import ExplorePicker from 'views/MosaicFiltersBar/ExplorePicker';
import GridAdjustment from 'views/MosaicFiltersBar/GridAdjustment';
import DropDownMediasMediumsPicker from 'views/MosaicFiltersBar/MediasMediumsDropDownPicker';

const App = () => {
  return (
    <Provider store={store}>
      <div>App</div>
      <ChannelsDropDownNav />
      <DimensionPicker />
      <ExplorePicker />
      <GridAdjustment />
      <DropDownMediasMediumsPicker />
    </Provider>
  );
};

export default App;
