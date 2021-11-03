// types
import type { Dimension as DimensionType } from 'application/reducers/dimension';
import type { Explore as ExploreType } from 'application/reducers/explore';
// libs
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
// components
import Dimension from '../Dimension';
// style
import './Dimensions.css';

type PropsFromWithState = {
  explore: ExploreType;
  btnLocation: 'inside' | 'outside';
  setDimension: (explore: DimensionType) => void;
  resetPagination: () => void;
  clearProjects: () => void;
};

const Dimensions = ({ btnLocation, ...props }: PropsFromWithState) => {
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
