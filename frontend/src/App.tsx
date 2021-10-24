// libraries
import { Provider } from 'react-redux';
// store utils
import store from 'application/store';
// tests!!!
import ChannelsDropDownNav from 'views/ChannelsNav/ChannelsDropDownNav';

const App = () => {
  return (
    <Provider store={store}>
      <ChannelsDropDownNav />
    </Provider>
  );
};

export default App;
