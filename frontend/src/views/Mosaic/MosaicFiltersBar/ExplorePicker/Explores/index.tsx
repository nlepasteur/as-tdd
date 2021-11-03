// types
import type { ComponentType, ReactElement } from 'react';
import type { Dimension } from 'application/reducers/dimension';
import type { Explore as ExploreType } from 'application/reducers/explore';
// components
import Explore from '../Explore';
// style
import './Explores.css';

type PropsFromWithState = {
  isLogged: boolean;
  dimension: Dimension;
  setExplore: (explore: ExploreType) => void;
  resetPagination: () => void;
  clearProjects: () => void;
};

export const explores = (Component: ComponentType) => {
  function Explores({ isLogged, ...props }: PropsFromWithState) {
    return (
      <ul className="explore-list">
        {!/channels/.test(location.pathname) && (
          <Explore {...props} explore="community">
            <Component />
          </Explore>
        )}
        <Explore {...props} explore="trending" />
        <Explore {...props} explore="latest" />
        {isLogged && <Explore {...props} explore="following" />}
      </ul>
    );
  }
  const wrappedComponentName =
    Component.displayName || Component.name || 'Component';
  Explores.displayName = `Explores(${wrappedComponentName})`;
  return Explores;
};

export default explores;
