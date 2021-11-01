// types
import { Grid as GridType } from 'application/reducers/grid';
// libs
import { render, fireEvent } from '@testing-library/react';
// components
import Grid from 'views/Mosaic/MosaicFiltersBar/GridAdjustment/Grid';

describe('Grid', () => {
  for (const adjustment of ['default', 'increase', 'decrease']) {
    it(`on click calls "adjustGrid" with "${adjustment}" as argument`, () => {
      const stubProps = {
        adjustGrid: jest.fn(),
        adjustment,
        grid: 'default' as const,
      };
      const { getByRole } = render(
        <Grid {...stubProps} adjustment={adjustment as GridType} />
      );
      fireEvent.click(getByRole('button'));
      expect(stubProps.adjustGrid).toBeCalledWith(stubProps.adjustment);
    });
  }

  for (const grid of ['increase', 'decrease']) {
    describe(`if current grid is ${grid}`, () => {
      it(`${grid} button is disable`, () => {
        const stubProps = {
          adjustGrid: jest.fn(),
          adjustment: grid,
          grid,
        };
        const { getByRole } = render(
          <Grid
            {...stubProps}
            grid={stubProps.grid as GridType}
            adjustment={stubProps.adjustment as GridType}
          />
        );
        expect(getByRole('button')).toHaveAttribute('disabled');
      });
    });
  }

  describe('if current grid is "default"', () => {
    it('"default" button isn\'t disabled', () => {
      const stubProps = {
        adjustGrid: jest.fn(),
        adjustment: 'default' as const,
        grid: 'default' as const,
      };
      const { getByRole } = render(<Grid {...stubProps} />);
      expect(getByRole('button')).not.toHaveAttribute('disabled');
    });
  });
});
