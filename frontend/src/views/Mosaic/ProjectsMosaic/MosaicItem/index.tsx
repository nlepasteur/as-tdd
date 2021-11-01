// types
import type { Project } from '@api';
import type { LocationWithState } from '../withState';
// libs
import { Link } from 'react-router-dom';

type PropsFromMosaicList = {
  project: Project;
  location: LocationWithState;
  cb?: (ref: HTMLElement) => void;
};

const MosaicItem = ({ project, cb, location }: PropsFromMosaicList) => {
  return (
    <Link
      to={{
        pathname: `/artwork/${project.id}`,
        state: {
          from: `${location.pathname}${location.search}`,
        },
      }}
    >
      <img
        src={project.smaller_square_cover_url}
        alt={`${project.title}'s thumbnail`}
      />
    </Link>
  );
};

export default MosaicItem;
