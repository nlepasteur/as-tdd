// types
import { Explore } from 'application/reducers/explore';
// libs
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
// components
import Dimension from '../Dimension';
// style
import './Dimensions.css';

type DimensionsProps = {
  explore: Explore;
  btnLocation: 'inside' | 'outside';
};

const Dimensions = ({ btnLocation, ...props }: DimensionsProps) => {
  const location = useLocation();
  const currentExplore = /dimension=(.+)$/.exec(location.search);
  return (
    <ul
      className={classnames('dimension-list', `dimension-list--${btnLocation}`)}
    >
      <li
        className={classnames(
          'dimension-list__item',
          currentExplore === null && 'active'
        )}
      >
        <Dimension {...props} dimension="all" />
      </li>
      <li
        className={classnames(
          'dimension-list__item',
          currentExplore && currentExplore[1] === '2d' && 'active'
        )}
      >
        <Dimension {...props} dimension="2d" />
      </li>
      <li
        className={classnames(
          'dimension-list__item',
          currentExplore && currentExplore[1] === '3d' && 'active'
        )}
      >
        <Dimension {...props} dimension="3d" />
      </li>
    </ul>
  );
};

export default Dimensions;
