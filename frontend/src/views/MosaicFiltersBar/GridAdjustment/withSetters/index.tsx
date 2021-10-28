// types
import type { ComponentType } from 'react';
import type { Grid } from 'application/reducers/grid';
// utils
import updateLocalStorage from 'utils/updateLocalStorage';

type PropsFromWithState = {
  // équivaut à props venant de withState
  grid: Grid;
  adjustGrid: (grid: Grid) => void;
};

type WrappedComponentProps = PropsFromWithState;

const withSetters = (Component: ComponentType<WrappedComponentProps>) => {
  function WithSetters(props: WrappedComponentProps) {
    const adjustGrid = (grid: Grid) => {
      const currentGrid =
        props.grid === 'small' || props.grid === 'large' ? 'default' : grid;
      props.adjustGrid(currentGrid);
      updateLocalStorage('grid', currentGrid);
      //   (async function () {
      //     fetch('http://localhost:8080/preferences', {
      //       method: 'PATCH',
      //       headers: {
      //         Accept: 'application/json',
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ grid: currentGrid }),
      //     });
      //   })();
    };

    return <Component {...props} adjustGrid={adjustGrid} />;
  }

  const wrappedComponentName =
    Component.displayName || Component.name || 'Component';
  WithSetters.displayName = `withSetters(${wrappedComponentName})`;

  return WithSetters;
};

export default withSetters;
