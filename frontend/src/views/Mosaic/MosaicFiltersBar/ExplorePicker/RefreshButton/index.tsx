// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState, AppDispatch } from 'application/store';
import type { Explore } from 'application/reducers/explore';
// libs
import { connect } from 'react-redux';
// components
import { FiRefreshCcw } from 'react-icons/fi';
import { incrementPagination } from 'application/actions/pagination';
import { clearProjects } from 'application/actions/projects';

const mapState = ({ explore }: RootState) => ({
  explore,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  incrementPagination: () => dispatch(incrementPagination()),
  clearProjects: () => dispatch(clearProjects()),
});

const connector = connect(mapState, mapDispatch);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const withExploreState = (Component: ComponentType<PropsFromRedux>) =>
  connect(mapState)((props: PropsFromRedux) => {
    return <Component {...props} />;
  });

const withRefreshSetter = (
  Component: ComponentType<{
    pickedExplore: Explore;
    refresh: () => void;
  }>
) => {
  function WithRefreshSetter(props: PropsFromRedux) {
    const refresh = () => {
      props.clearProjects();
      props.incrementPagination();
    };
    return <Component refresh={refresh} pickedExplore={props.explore} />;
  }
  const wrappedComponentName =
    Component.displayName || Component.name || 'Component';
  WithRefreshSetter.displayName = `withRefreshSetter(${wrappedComponentName})`;
  return WithRefreshSetter;
};

export const RefreshCommunityMosaic = (props: {
  pickedExplore: Explore;
  refresh: () => void;
}) => {
  return (
    <button
      name="refresh"
      disabled={props.pickedExplore === 'community' ? false : true}
      onClick={props.refresh}
      style={{ color: 'rgb(var(--blue))' }}
    >
      <FiRefreshCcw />
    </button>
  );
};

export default connector(
  withExploreState(withRefreshSetter(RefreshCommunityMosaic))
);
