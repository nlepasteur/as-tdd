// types
import type { Explore as ExploreType } from 'application/reducers/explore';
import type { Dimension as DimensionType } from 'application/reducers/dimension';
// libs
import { Link, useHistory, useLocation } from 'react-router-dom';
// utils
import updateLocalStorage from 'utils/updateLocalStorage';

type DimensionProps = {
  dimension: DimensionType;
  explore: ExploreType;
  setDimension: (dimension: DimensionType) => void;
  resetPagination: () => void;
  clearProjects: () => void;
};

const Dimension = (props: DimensionProps) => {
  const history = useHistory();

  const generatePathname = (dimension: string) => {
    return dimension !== 'all'
      ? `/?sort_by=${props.explore}&dimension=${dimension}`
      : `/?sort_by=${props.explore}`;
  };

  const handleDimensionClick = (dimension: DimensionType) => {
    props.clearProjects();
    props.resetPagination();
    props.setDimension(dimension);
    updateLocalStorage('dimension', dimension);
    history.push(generatePathname(dimension));
  };

  return (
    <button onClick={() => handleDimensionClick(props.dimension)}>
      {props.dimension}
    </button>
  );
};

export default Dimension;
