// types
import type { ReactElement } from 'react';
import type { Dimension } from 'application/reducers/dimension';
// libraries
import { NavLink } from 'react-router-dom';

type Explore = 'community' | 'trending' | 'latest' | 'following';

type ExploreProps = {
  explore: Explore;
  dimension: Dimension;
  children?: ReactElement;
};

const Explore = (props: ExploreProps) => {
  const generatePathname = (explore: string) => {
    // aurait pu tout aussi bien se faire en utilisant location
    return props.dimension !== 'all'
      ? `/?sort_by=${explore}&dimension=${props.dimension}`
      : `/?sort_by=${explore}`;
  };
  // si navling ne fait pas l'affaire utiliser location et comparer search à props.explore
  return (
    <NavLink activeClassName="active" to={generatePathname(props.explore)}>
      {props.explore}
      {props.children && props.children}
    </NavLink>
  );
};

export default Explore;
