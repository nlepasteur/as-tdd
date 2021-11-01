// types
import { Project } from '@api';
import type { Grid } from 'application/reducers/grid';
import type { LocationWithState } from '../withState';
// utils
import createClasses from 'utils/createClasses';
// components
import MosaicItem from '../MosaicItem';

type PropsFromMosaicListContainer = {
  location: LocationWithState;
  data: Project[];
  cb?: (ref: HTMLElement) => void;
  community?: boolean;
  trending?: boolean;
  latest?: boolean;
  following?: boolean;
  grid?: Grid;
};

const MosaicList = ({
  data,
  cb,
  grid,
  location,
  ...props
}: PropsFromMosaicListContainer) => (
  <ul className={createClasses(props as { [key: string]: boolean })}>
    {data.map((project) => (
      <li key={project.id}>
        <MosaicItem project={project} cb={cb} location={location} />
      </li>
    ))}
  </ul>
);

export default MosaicList;
