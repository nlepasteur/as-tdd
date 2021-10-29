// libraries
import { Provider } from 'react-redux';
// store utils
import store from 'application/store';
// style
import './App.css';
// tests!!!

import {
  MediasList,
  MediumsList,
} from 'views/MosaicFiltersBar/MediasMediumsDropDownPicker/';
const App = () => {
  return (
    <Provider store={store}>
      <div>App</div>
      <MediumsList />
      <MediasList data={[{ name: 'media 1' }, { name: 'media 2' }]} />
    </Provider>
  );
};

export default App;
