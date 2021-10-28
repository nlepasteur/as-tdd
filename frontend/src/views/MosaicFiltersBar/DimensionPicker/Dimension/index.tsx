// types
import type { Explore } from 'application/reducers/explore';
import type { Dimension as DimensionType } from 'application/reducers/dimension';
// libraries
import { NavLink } from 'react-router-dom';
type DimensionProps = {
  dimension: DimensionType;
  explore: Explore;
};

const Dimension = (props: DimensionProps) => {
  const generatePathname = (dimension: string) => {
    // aurait pu tout aussi bien se faire en utilisant location
    return dimension !== 'all'
      ? `/?sort_by=${props.explore}&dimension=${dimension}`
      : `/?sort_by=${props.explore}`;
  };
  // si navling ne fait pas l'affaire utiliser location et comparer search à props.dimension
  return (
    <NavLink to={generatePathname(props.dimension)} activeClassName="active">
      {props.dimension}
    </NavLink>
  );
};

export default Dimension;
