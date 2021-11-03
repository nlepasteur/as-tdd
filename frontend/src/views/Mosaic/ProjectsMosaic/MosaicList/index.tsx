// types
import { Project } from '@api';
import type { Grid } from 'application/reducers/grid';
import type { LocationWithState } from '../withState';
// libs
import classnames from 'classnames';
// utils
import createClasses from 'utils/createClasses';
// components
import MosaicItem from '../MosaicItem';
// style
import './MosaicList.css';

type PropsFromMosaicListContainer = {
  shuffledProjects: Project[];
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
  data: inOrderProjects,
  cb,
  grid,
  location,
  shuffledProjects,
  ...props
}: PropsFromMosaicListContainer) => {
  const projects = props.community ? shuffledProjects : inOrderProjects;

  return (
    <ul
      className={classnames(
        createClasses(props as { [key: string]: boolean }, 'mosaic-list--'),
        'mosaic-list',
        grid && `mosaic-list--${grid}`
      )}
    >
      {projects.map((project, i, array) => {
        return (
          <li
            ref={
              cb && i === array.length - 1
                ? (ref) => cb(ref as HTMLElement)
                : null
            }
            key={project.id}
            className={classnames(
              'mosaic-list__item',
              `mosaic-list__item--${inOrderProjects.indexOf(
                inOrderProjects.find(
                  (correspondingProject) =>
                    correspondingProject.id === project.id
                ) as Project
              )}`
            )}
          >
            <MosaicItem project={project} location={location} />
          </li>
        );
      })}
    </ul>
  );
};

export default MosaicList;
