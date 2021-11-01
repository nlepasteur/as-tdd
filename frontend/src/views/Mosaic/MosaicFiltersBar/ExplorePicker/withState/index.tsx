// types
import type { ComponentType } from 'react';
import type { RootState } from 'application/store';
// libs
import { connect } from 'react-redux';

const mapState = ({ isLogged, dimension }: RootState) => ({
  isLogged,
  dimension,
});

export const connector = connect(mapState);

type PropsFromRedux = ReturnType<typeof mapState>;

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
