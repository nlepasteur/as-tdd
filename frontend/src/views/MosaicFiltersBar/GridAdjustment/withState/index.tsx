// types
import type { ComponentType } from 'react';
import type { ConnectedProps } from 'react-redux';
import type { RootState, AppDispatch } from 'application/store';
import type { Grid } from 'application/reducers/grid';
// libs
import { useEffect } from 'react';
import { connect } from 'react-redux';
// store utils
import { useAppDispatch, AppThunkDispatch } from 'application/hooks';
import { adjustGrid, getUserPreferenceGrid } from 'application/actions/grid';

const mapState = ({ grid }: RootState) => ({
  grid,
});

const mapDispatch = (dispatch: AppDispatch) => ({
  adjustGrid: (grid: Grid) => dispatch(adjustGrid(grid)),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type WrappedComponentProps = PropsFromRedux;

const withState = (Component: ComponentType<WrappedComponentProps>) => {
  function WithState(props: PropsFromRedux) {
    // const dispatch: AppThunkDispatch = useAppDispatch();
    // useEffect(() => {
    //   dispatch(getUserPreferenceGrid());
    // }, [dispatch]);
    return <Component {...props} />;
  }

  const wrappedComponentName =
    Component.displayName || Component.name || 'Component';
  WithState.displayName = `withState(${wrappedComponentName})`;

  return WithState;
};

export default withState;
