// types
import { ReactElement, useEffect, useRef } from 'react';
// libs
import { Route, Switch, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
// store utils
import store from 'application/store';
// components
import Mosaic from 'views/Mosaic';
import ArtworkPage from 'views/ArtworkPage';
// import MosaicFiltersBar from 'views/Mosaic/MosaicFiltersBar';
// style
import './App.css';

const App = () => {
  // window.scrollTo(1000, 1.000);
  const ref = useRef<any>();
  useEffect(() => {
    // window.scrollBy(450, 450);
    console.log('WINDOW.SCROLLTO CALLED');
    // window.scrollTo(0, 100);
    // console.log('ref: ', ref.current.scrollHeight);
    // ref.current.scrollBottom;
    // console.log('window.scrollBy: ', window.scrollBy);
    // ref.current.scrollHeight = '175px';
  }, []);
  console.log('RENDER!!! SHOULD EQ 1');
  return (
    <StopScrollOnArtworkPageOverlay>
      <div ref={ref}>
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
            style={{
              // position: 'relative',
              // zIndex: 10000,
              height: '400px',
              backgroundColor: '#222',
            }}
          />
          {/* <div
            style={{
              height: '700px',
              backgroundColor: 'green',
            }}
          /> */}
          {/* <div
            style={{
              position: 'sticky',
              top: '40px',
            }}
          /> */}
          {/* <MosaicFiltersBar /> */}
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
    </StopScrollOnArtworkPageOverlay>
  );
};

function StopScrollOnArtworkPageOverlay({
  children,
}: {
  children: ReactElement;
}) {
  const location = useLocation();
  return (
    <div
      style={{
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        overflow: /artwork/.test(location.pathname) ? 'hidden' : 'auto',
      }}
    >
      {children}
    </div>
  );
}

export default App;
