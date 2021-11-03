// types
import type { Project } from '@api';
import type { LocationWithState } from '../withState';
// libs
import { Link } from 'react-router-dom';
// style
import './MosaicItem.css';

type PropsFromMosaicList = {
  project: Project;
  location: LocationWithState;
};

const MosaicItem = ({ project, location }: PropsFromMosaicList) => {
  return (
    <>
      <img
        src={project.smaller_square_cover_url}
        alt={`${project.title}'s thumbnail`}
      />
      <Link
        to={{
          pathname: `/artwork/${project.id}`,
          state: {
            from: `${location.pathname}${location.search}`,
          },
        }}
      />
    </>
  );
};

export default MosaicItem;
