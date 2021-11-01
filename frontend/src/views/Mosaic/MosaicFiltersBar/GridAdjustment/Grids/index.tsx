// types
import type { Grid as GridType } from 'application/reducers/grid';
import type { Explore } from 'application/reducers/explore';
// libs
import classnames from 'classnames';
// components
import Grid from '../Grid';
// style
import './Grids.css';

type GridsProps = {
  grid: GridType;
  adjustGrid: (adjustment: GridType) => void;
  explore: Explore;
};

const Grids = (props: GridsProps) => (
  <ul
    className={classnames(
      'adjust-grid-list',
      props.explore === 'community' && 'adjust-grid-list--hidden'
    )}
  >
    <Grid {...props} adjustment="small" />
    <Grid {...props} adjustment="default" />
    <Grid {...props} adjustment="large" />
  </ul>
);

export default Grids;
