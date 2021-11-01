// types
import type { Explore } from 'application/reducers/explore';
import type { Dimension } from 'application/reducers/dimension';
// libs
import { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
// store utils
import { useAppDispatch } from 'application/hooks';
import { setExplore } from 'application/actions/explore';
import { setDimension } from 'application/actions/dimension';
// components
import MosaicFiltersBar from './MosaicFiltersBar';
import ProjectsMosaic from './ProjectsMosaic';

const ShuffledProjectsMosaic = ProjectsMosaic.shuffledProjectsMosaic;
const InfiniteScrollProjectsMosaic =
  ProjectsMosaic.infiniteScrollProjectsMosaic;

const Mosaic = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<{ from: string }>();
  useEffect(() => {
    if (
      /^\?sort_by=(community|trending|latest|following)(&dimension=(2|3)d)?$/.test(
        location.search
      )
    ) {
      const exploreInUrl = /sort_by=([^&]+)/.exec(location.search);
      const dimensionInUrl = /&dimension=(.+)/.exec(location.search);
      const explore = exploreInUrl && (exploreInUrl[1] as Explore);
      const dimension = dimensionInUrl && (dimensionInUrl[1] as Dimension);
      explore && dispatch(setExplore(explore));
      !dimension
        ? dispatch(setDimension('all'))
        : dimension && dispatch(setDimension(dimension));
    }
  }, [location, dispatch]);
  // const position = /artwork/.test(location.pathname) ? 'fixed' : 'relative';
  return (
    <div>
      <MosaicFiltersBar />
      <Switch>
        <Route path="/channels/:channel_name">
          <InfiniteScrollProjectsMosaic isChannel />
        </Route>
        <Route
          path="/"
          render={({ location }: any) => {
            return /artwork/.test(location.pathname) ? (
              /trending/.test(location.state.from) ? (
                <InfiniteScrollProjectsMosaic isExplore trending />
              ) : /latest/.test(location.state.from) ? (
                <InfiniteScrollProjectsMosaic isExplore latest />
              ) : /community/.test(location.state.from) ? (
                <ShuffledProjectsMosaic isExplore community />
              ) : (
                <InfiniteScrollProjectsMosaic isExplore following />
              )
            ) : /^\?sort_by=(community|trending|latest|following)(&dimension=(2|3)d)?$/.test(
                location.search
              ) ? (
              /community/.test(location.search) ? (
                <ShuffledProjectsMosaic isExplore community />
              ) : /trending/.test(location.search) ? (
                <InfiniteScrollProjectsMosaic isExplore trending />
              ) : /latest/.test(location.search) ? (
                <InfiniteScrollProjectsMosaic isExplore latest />
              ) : (
                <InfiniteScrollProjectsMosaic isExplore following />
              )
            ) : (
              <Redirect to="/?sort_by=community" />
            );
          }}
        />
      </Switch>
    </div>
  );
};

export default Mosaic;
