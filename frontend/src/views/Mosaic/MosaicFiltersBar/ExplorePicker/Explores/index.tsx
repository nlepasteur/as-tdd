// types
import type { ComponentType, ReactElement } from 'react';
import type { Dimension } from 'application/reducers/dimension';
// components
import Explore from '../Explore';
// style
import './Explores.css';

type ExploresProps = {
  isLogged: boolean;
  dimension: Dimension;
};

export const explores = (Component: ComponentType) => {
  function Explores(props: ExploresProps) {
    return (
      <ul className="explore-list">
        {!/channels/.test(location.pathname) && (
          <Explore {...props} explore="community">
            <Component />
          </Explore>
        )}
        <Explore {...props} explore="trending" />
        <Explore {...props} explore="latest" />
        {props.isLogged && <Explore {...props} explore="following" />}
      </ul>
    );
  }
  const wrappedComponentName =
    Component.displayName || Component.name || 'Component';
  Explores.displayName = `Explores(${wrappedComponentName})`;
  return Explores;
};

export default explores;
