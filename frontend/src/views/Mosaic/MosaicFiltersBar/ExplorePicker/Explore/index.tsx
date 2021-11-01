// types
import type { ReactElement } from 'react';
import type { Dimension } from 'application/reducers/dimension';
// libs
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
// style
import './Explore.css';

type Explore = 'community' | 'trending' | 'latest' | 'following';

type ExploreProps = {
  explore: Explore;
  dimension: Dimension;
  children?: ReactElement;
};

const Explore = (props: ExploreProps) => {
  const location = useLocation();
  const currentExplore = /sort_by=([^&]+)/.exec(location.search);

  const generatePathname = (explore: string) => {
    // aurait pu tout aussi bien se faire en utilisant location
    return props.dimension !== 'all'
      ? `/?sort_by=${explore}&dimension=${props.dimension}`
      : `/?sort_by=${explore}`;
  };
  // si navling ne fait pas l'affaire utiliser location et comparer search à props.explore
  return (
    <li
      className={classnames(
        'explore-list__item',
        currentExplore &&
          currentExplore[1] === props.explore &&
          'explore-list__item--active'
      )}
    >
      <Link to={generatePathname(props.explore)}>
        <span>{props.explore}</span>
      </Link>
      {props.children && props.children}
    </li>
  );
};

export default Explore;
