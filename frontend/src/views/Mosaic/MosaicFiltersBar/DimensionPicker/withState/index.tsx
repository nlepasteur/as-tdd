// types
import type { ComponentType } from 'react';
import type { RootState } from 'application/store';
// libs
import { connect } from 'react-redux';

const mapState = ({ explore }: RootState) => ({
  explore,
});

export const connector = connect(mapState);

type PropsFromRedux = ReturnType<typeof mapState>;

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
