// libraries
import { Provider } from 'react-redux';
// store utils
import store from 'application/store';
// style
import './App.css';
// tests!!!
// import ChannelsDropDownNav from 'views/ChannelsNav/ChannelsDropDownNav';
import ExplorePicker from 'views/MosaicFiltersBar/ExplorePicker';
import DimensionPicker from 'views/MosaicFiltersBar/DimensionPicker';
import GridAdjustment from 'views/MosaicFiltersBar/GridAdjustment';
const App = () => {
  return (
    <Provider store={store}>
      <div>App</div>
      {/* <ChannelsDropDownNav /> */}
      <ExplorePicker />
      <DimensionPicker />
      <GridAdjustment />
    </Provider>
  );
};

export default App;
