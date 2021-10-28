// types
import { Explore } from 'application/reducers/explore';
// components
import Dimension from '../Dimension';

type DimensionsProps = {
  explore: Explore;
};

const Dimensions = (props: DimensionsProps) => (
  <ul>
    <li>
      <Dimension {...props} dimension="all" />
    </li>
    <li>
      <Dimension {...props} dimension="2d" />
    </li>
    <li>
      <Dimension {...props} dimension="3d" />
    </li>
  </ul>
);

export default Dimensions;
