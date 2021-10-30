// types
import type { ComponentType } from 'react';
import type { AppThunkDispatch } from 'application/hooks';
import type { Project } from '@api';
import type { Grid } from 'application/reducers/grid';
// libs
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// store utils
import { useAppDispatch, useAppSelector } from 'application/hooks';
import { getProjects as getProjectsAC } from 'application/actions/projects';
import { getCurrentPagination } from 'application/selectors/pagination';
import { getPickedMediums } from 'application/selectors/mediums';
import { getPickedMedias } from 'application/selectors/medias';
import { getPickedDimension } from 'application/selectors/dimension';
import { getPreferedGrid } from 'application/selectors/grid';
import { getProjects as getProjectsS } from 'application/selectors/projects';
import { getShuffledProjects } from 'application/selectors/shuffledProjects';

type IsExplore = { isExplore: true };

type Community = {
  community: true;
  trending?: never;
  latest?: never;
  following?: never;
};
type Trending = {
  community?: never;
  trending: true;
  latest?: never;
  following?: never;
};
type Latest = {
  community?: never;
  trending?: never;
  latest: true;
  following?: never;
};
type Following = {
  community?: never;
  trending?: never;
  latest?: never;
  following: true;
};

type Explore = Community | Trending | Latest | Following;

type IsChannel = { isChannel: true };

type ProjectsFetchState = FetchState<Project>;

export type LocationWithState = ReturnType<typeof useLocation>;

type WrappedComponentProps = {
  location: LocationWithState;
  status: FetchStatus;
  error: null | string;
  data: Project[];
  community?: boolean;
  trending?: boolean;
  latest?: boolean;
  following?: boolean;
  grid?: Grid;
};

const withState = (Component: ComponentType<WrappedComponentProps>) => {
  function WithState(props: IsExplore & Explore): JSX.Element;
  function WithState(props: IsChannel): JSX.Element;
  function WithState({
    isExplore,
    isChannel,
    ...props
  }: {
    isExplore?: true;
    community?: true;
    trending?: true;
    latest?: true;
    following?: true;
    isChannel?: true;
  }) {
    const location = useLocation<{ from: string }>();
    const dispatch: AppThunkDispatch = useAppDispatch();
    const projectsState = useAppSelector(getProjectsS);
    const shuffledProjects = useAppSelector(getShuffledProjects);
    const pagination = useAppSelector(getCurrentPagination);
    const medium_ids = useAppSelector(getPickedMediums);
    const dimension = useAppSelector(getPickedDimension);
    const asset_types = useAppSelector(getPickedMedias);
    const per_page = 100;
    const grid = useAppSelector(getPreferedGrid);
    const projects = props.community ? shuffledProjects : projectsState.data;

    const url = isExplore
      ? props.community
        ? `/community/explore/projects/community?page=${pagination}&dimension=${dimension}&per_page=${per_page}${
            medium_ids.length ? `&medium_ids=${medium_ids}` : ''
          }${asset_types.length ? `asset_types=${asset_types}` : ''}`
        : `/community/explore/projects/${
            props.trending ? 'trending' : props.latest ? 'latest' : 'following'
          }?page=${pagination}&dimension=${dimension}&per_page=${per_page}${
            medium_ids.length ? `&medium_ids=${medium_ids}` : ''
          }${asset_types.length ? `asset_types=${asset_types}` : ''}`
      : `/channels?page=${pagination}&dimension=${dimension}&per_page=${per_page}${
          medium_ids.length ? `&medium_ids=${medium_ids}` : ''
        }${asset_types.length ? `asset_types=${asset_types}` : ''}`;

    useEffect(() => {
      if (!/artwork/.test(location.pathname)) {
        console.log('FIRE FETCH WITH NEW URL!!!');
        dispatch(getProjectsAC(url));
      }
    }, [url, location.pathname, dispatch]);

    return (
      <Component
        location={location}
        grid={grid}
        {...props}
        {...projectsState}
        data={projects}
      />
    );
  }

  const wrappedComponentName =
    Component.displayName || Component.name || 'Component';

  WithState.displayName = `withState(${wrappedComponentName})`;

  return WithState;
};

export default withState;
