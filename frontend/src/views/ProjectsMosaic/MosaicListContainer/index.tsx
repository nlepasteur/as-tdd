// types
import type { Project } from '@api';
import type { Grid } from 'application/reducers/grid';
import type { LocationWithState } from '../withState';
// component
import MosaicList from '../MosaicList';

// Type '({ status, error, ...props }: PropsFromWithStateOrSetter) => Element' is missing the following properties from type 'PropsFromWithState': location, status, error, datats(2345)

type PropsFromWithStateOrSetter = {
  location: LocationWithState;
  status: FetchStatus;
  error: null | string;
  data: Project[];
  cb?: (ref: HTMLElement) => void;
  community?: boolean;
  trending?: boolean;
  latest?: boolean;
  following?: boolean;
  grid?: Grid;
};

const MosaicListContainer = ({
  status,
  error,
  ...props
}: PropsFromWithStateOrSetter) => (
  <div>
    {status === 'init' || status === 'fetching' ? (
      <div>loadin...</div>
    ) : (
      <MosaicList {...props} />
    )}
  </div>
);

export default MosaicListContainer;
