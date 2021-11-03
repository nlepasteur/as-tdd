// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState } from 'application/store';
import type { AppDispatch } from 'application/store';
import type { Dimension as DimensionType } from 'application/reducers/dimension';
// sore utils
import { setDimension } from 'application/actions/dimension';
import { clearProjects } from 'application/actions/projects';
import { resetPagination } from 'application/actions/pagination';
// libs
import { connect } from 'react-redux';

const mapState = ({ explore }: RootState) => ({
  explore,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  setDimension: (dimension: DimensionType) => dispatch(setDimension(dimension)),
  resetPagination: () => dispatch(resetPagination()),
  clearProjects: () => dispatch(clearProjects()),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type WithStateProps = PropsFromRedux & { btnLocation: 'inside' | 'outside' };

const withState = (Component: ComponentType<WithStateProps>) => {
  function WithState(props: WithStateProps) {
    return <Component {...props} />;
  }

  const wrappedComponentName =
    Component.displayName || Component.name || 'Component';
  WithState.displayName = `withState2(${wrappedComponentName})`;

  return WithState;
};

export default withState;
