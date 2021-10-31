// types
import type { Dimension } from 'application/reducers/dimension';
// components
import Explore from '../Explore';
import RefreshButton from '../RefreshButton';
// style
import './Explores.css';

type ExploresProps = {
  isLogged: boolean;
  dimension: Dimension;
};

const Explores = (props: ExploresProps) => {
  return (
    <ul className="explore-list">
      {!/channels/.test(location.pathname) && (
        <Explore {...props} explore="community">
          <RefreshButton />
        </Explore>
      )}
      <Explore {...props} explore="trending" />
      <Explore {...props} explore="latest" />
      {props.isLogged && <Explore {...props} explore="following" />}
    </ul>
  );
};

export default Explores;
