// libraries
import { Provider } from 'react-redux';
// store utils
import store from 'application/store';
// style
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div>App</div>
    </Provider>
  );
};

export default App;
