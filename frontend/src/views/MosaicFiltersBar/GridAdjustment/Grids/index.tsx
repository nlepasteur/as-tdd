// types
import type { Grid as GridType } from 'application/reducers/grid';
// components
import Grid from '../Grid';

type GridsProps = {
  grid: GridType;
  adjustGrid: (adjustment: GridType) => void;
};

const Grids = (props: GridsProps) => (
  <ul>
    <li>
      <Grid {...props} adjustment="small" />
    </li>
    <li>
      <Grid {...props} adjustment="default" />
    </li>
    <li>
      <Grid {...props} adjustment="large" />
    </li>
  </ul>
);

export default Grids;
