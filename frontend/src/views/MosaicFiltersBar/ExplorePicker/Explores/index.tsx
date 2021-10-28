// types
import type { Dimension } from 'application/reducers/dimension';
// components
import Explore from '../Explore';

type ExploresProps = {
  isLogged: boolean;
  dimension: Dimension;
};

const Explores = (props: ExploresProps) => {
  return (
    <ul className="explore-picker">
      {!/channels/.test(location.pathname) && (
        <li>
          <Explore {...props} explore="community">
            <div>yoyo</div>
          </Explore>
        </li>
      )}
      <li>
        <Explore {...props} explore="trending" />
      </li>
      <li>
        <Explore {...props} explore="latest" />
      </li>
      {props.isLogged && (
        <li>
          <Explore {...props} explore="following" />
        </li>
      )}
    </ul>
  );
};

export default Explores;
