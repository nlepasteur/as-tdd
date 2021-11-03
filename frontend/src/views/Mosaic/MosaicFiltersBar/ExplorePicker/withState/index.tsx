// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { AppDispatch, RootState } from 'application/store';
import type { Explore } from 'application/reducers/explore';
// store utils
import { setExplore } from 'application/actions/explore';
import { clearProjects } from 'application/actions/projects';
import { resetPagination } from 'application/actions/pagination';
// libs
import { connect } from 'react-redux';

const mapState = ({ isLogged, dimension }: RootState) => ({
  isLogged,
  dimension,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  setExplore: (explore: Explore) => dispatch(setExplore(explore)),
  resetPagination: () => dispatch(resetPagination()),
  clearProjects: () => dispatch(clearProjects()),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type WithStateProps = PropsFromRedux;

const withState = (Component: ComponentType<WithStateProps>) => {
  function WithState(props: PropsFromRedux) {
    return <Component {...props} />;
  }

  const wrappedComponentName =
    Component.displayName || Component.name || 'Component';
  WithState.displayName = `withState(${wrappedComponentName})`;

  return WithState;
};

export default withState;
