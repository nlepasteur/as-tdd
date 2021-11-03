// types
import type { ReactElement } from 'react';
import type { Explore as ExploreType } from 'application/reducers/explore';
import type { Dimension } from 'application/reducers/dimension';
// libs
import { useHistory, useLocation } from 'react-router-dom';
import classnames from 'classnames';
// utils
import updateLocalStorage from 'utils/updateLocalStorage';
// style
import './Explore.css';

type PropsFromExplores = {
  explore: ExploreType;
  dimension: Dimension;
  children?: ReactElement;
  setExplore: (explore: ExploreType) => void;
  resetPagination: () => void;
  clearProjects: () => void;
};

const Explore = (props: PropsFromExplores) => {
  const history = useHistory();
  const location = useLocation();
  const currentExplore = /sort_by=([^&]+)/.exec(location.search);

  const generatePathname = (explore: string) => {
    return props.dimension !== 'all'
      ? `/?sort_by=${explore}&dimension=${props.dimension}`
      : `/?sort_by=${explore}`;
  };

  const handleExploreClick = (explore: ExploreType) => {
    props.clearProjects();
    props.resetPagination();
    props.setExplore(explore);
    updateLocalStorage('explore', explore);
    history.push(generatePathname(explore));
  };

  return (
    <li
      className={classnames(
        'explore-list__item',
        currentExplore &&
          currentExplore[1] === props.explore &&
          'explore-list__item--active'
      )}
    >
      <button
        className="explore-btn"
        onClick={() => handleExploreClick(props.explore)}
      >
        <span>{props.explore}</span>
      </button>
      {props.children && props.children}
    </li>
  );
};

export default Explore;
