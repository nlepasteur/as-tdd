// libraries
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// components
import Dimension from 'views/MosaicFiltersBar/DimensionPicker/Dimension';
import Dimensions from 'views/MosaicFiltersBar/DimensionPicker/Dimensions';
describe('Dimension', () => {
  for (const [dimension, expected] of [
    ['all', /all/i],
    ['2d', /2d/i],
    ['3d', /3d/i],
  ] as const) {
    describe(`dimension prop is "${dimension}"`, () => {
      it(`displays "${dimension}"`, () => {
        const stubProps = {
          dimension,
          explore: 'community' as const,
        };
        const { getByText } = render(<Dimension {...stubProps} />, {
          wrapper: BrowserRouter as any,
        });
        expect(getByText(expected)).toBeInTheDocument();
      });
    });
  }
});

describe('Dimensions', () => {
  it('displays "all", "2d" and "3d" as possible explore filter', () => {
    const stubProps = { explore: 'community' as const };
    const { getByText } = render(<Dimensions {...stubProps} />, {
      wrapper: BrowserRouter as any,
    });
    expect(
      [/all/i, /2d/i, /3d/i].every((explore) => getByText(explore))
    ).toBeTruthy();
  });
});
