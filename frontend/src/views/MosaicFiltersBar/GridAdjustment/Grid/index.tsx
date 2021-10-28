// types
import type { Grid as GridType } from 'application/reducers/grid';

type GridProps = {
  grid: GridType;
  adjustment: GridType;
  adjustGrid: (adjustment: GridType) => void;
};

const Grid = (props: GridProps) => (
  <button
    disabled={props.grid !== 'default' && props.grid === props.adjustment}
    onClick={() => props.adjustGrid(props.adjustment)}
  >
    yo
  </button>
);

export default Grid;
