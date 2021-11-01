// types
import type { Grid as GridType } from 'application/reducers/grid';
// libs
import classnames from 'classnames';
// icons
import { BsGrid3X3Gap } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
// style
import './Grid.css';

type GridProps = {
  grid: GridType;
  adjustment: GridType;
  adjustGrid: (adjustment: GridType) => void;
};

const Grid = (props: GridProps) => (
  <li
    className={classnames(
      'adjust-grid-list__item',
      props.grid === props.adjustment &&
        props.adjustment !== 'default' &&
        'adjust-grid-list__item--active'
    )}
  >
    <button
      disabled={props.grid !== 'default' && props.grid === props.adjustment}
      onClick={() => props.adjustGrid(props.adjustment)}
    >
      {props.adjustment === 'small' ? (
        <AiOutlineMinus />
      ) : props.adjustment === 'large' ? (
        <AiOutlinePlus />
      ) : (
        <BsGrid3X3Gap />
      )}
    </button>
  </li>
);

export default Grid;
