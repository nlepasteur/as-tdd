// types
import type { Explore } from 'application/reducers/explore';
import type { Dimension as DimensionType } from 'application/reducers/dimension';
// libs
import { Link } from 'react-router-dom';

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
  return (
    <Link to={generatePathname(props.dimension)}>
      <span>{props.dimension}</span>
    </Link>
  );
};

export default Dimension;
