import withState, { connector } from './withState';
import withSetters from './withSetters';
import Grids from './Grids';

export default connector(withState(withSetters(Grids)));
