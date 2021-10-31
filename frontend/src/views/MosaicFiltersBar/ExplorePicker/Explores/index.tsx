// types
import type { Dimension } from 'application/reducers/dimension';
// libs
import { useLocation } from 'react-router-dom';
// components
import Explore from '../Explore';
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
          <div className="list-item__refresh">yoyo</div>
        </Explore>
      )}
      <Explore {...props} explore="trending" />
      <Explore {...props} explore="latest" />
      {props.isLogged && <Explore {...props} explore="following" />}
    </ul>
  );
};

export default Explores;
