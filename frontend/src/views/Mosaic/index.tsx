// types
import type { Explore } from 'application/reducers/explore';
import type { Dimension } from 'application/reducers/dimension';
// libs
import { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
// store utils
import { useAppDispatch, useAppSelector } from 'application/hooks';
import { getPickedExplore } from 'application/selectors/explore';
import { getPickedDimension } from 'application/selectors/dimension';
import { setExplore } from 'application/actions/explore';
import { setDimension } from 'application/actions/dimension';
// components
import MosaicFiltersBar from './MosaicFiltersBar';
import ProjectsMosaic from './ProjectsMosaic';
import { getProjects } from 'application/selectors/projects';

const ShuffledProjectsMosaic = ProjectsMosaic.shuffledProjectsMosaic;
const InfiniteScrollProjectsMosaic =
  ProjectsMosaic.infiniteScrollProjectsMosaic;

const Mosaic = () => {
  const projects = useAppSelector(getProjects);
  const explore = useAppSelector(getPickedExplore);
  const dimension = useAppSelector(getPickedDimension);
  const dispatch = useAppDispatch();
  const location = useLocation<{ from: string }>();

  useEffect(() => {
    // prevent hard refresh ici
    if (
      /^\?sort_by=(community|trending|latest|following)(&dimension=(2|3)d)?$/.test(
        location.search
      ) &&
      projects.data.length
    ) {
      const exploreInUrl = /sort_by=([^&]+)/.exec(
        location.search
      ) as RegExpExecArray;
      const explore = exploreInUrl[1] as Explore;
      dispatch(setExplore(explore));
      const dimensionInUrl = /&dimension=(.+)/.exec(location.search);
      const dimension = dimensionInUrl && (dimensionInUrl[1] as Dimension);
      dimension && dispatch(setDimension(dimension));
      // ajouter updateLocalStorage
    }
  }, [explore, dimension, location.search, dispatch]);

  return (
    <div
      style={{
        minHeight: '700px',
      }}
    >
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
