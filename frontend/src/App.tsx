// libs
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// store utils
import store from 'application/store';
// components
import Mosaic from 'views/Mosaic';
import ArtworkPage from 'views/ArtworkPage';
// style
import './App.css';

const App = () => {
  // const history = useHistory();
  // console.log('history.scrollRestoration: ', history);
  // console.log('rerender');
  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        overflow: /artwork/.test(location.pathname) ? 'hidden' : 'auto',
        // overflow: /artwork/.test(location.pathname) ? 'hidden' : 'auto',
      }}
    >
      <Provider store={store}>
        <nav
          style={{
            color: 'white',
            position: 'fixed',
            backgroundColor: '#171717',
            height: '40px',
            display: 'block',
            width: '100%',
          }}
        >
          navigation bar
        </nav>
        <div
          className="between-nav-and-mosaic"
          style={{
            height: '400px',
            backgroundColor: '#222',
          }}
        />
        <div
          style={{
            position: 'sticky',
            top: '40px',
          }}
        />

        <Route
          path="/artwork/:id"
          render={({ match }) => {
            return <ArtworkPage />;
          }}
        />

        <Switch>
          <Route
            exact
            path={['/', '/artwork/:id', '/channels/:channel_name']}
            render={({ location }) => {
              // return /artwork/.test(location.pathname) &&
              //   !location.state ? null : (
              //   <Mosaic />
              // );
              return /channels/.test(location.pathname) ? (
                <Mosaic />
              ) : /artwork/.test(location.pathname) &&
                !location.state ? null : (
                <Mosaic />
              );
            }}
          />

          <Route path="*">
            <div style={{ color: 'white' }}>Not Found</div>
          </Route>
        </Switch>
      </Provider>
    </div>
  );
};

export default App;
