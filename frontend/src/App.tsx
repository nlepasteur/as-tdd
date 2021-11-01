// libraries
import { Provider } from 'react-redux';
// store utils
import store from 'application/store';
// style
import './App.css';
// test!!!
import Mosaic from 'views/Mosaic';

const App = () => {
  return (
    <Provider store={store}>
      <Mosaic />
    </Provider>
  );
};

export default App;
