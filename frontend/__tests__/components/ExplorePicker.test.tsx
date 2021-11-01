// types
import { ReactElement } from 'react';
// libraries
import { render } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
// components
import Explore from 'views/Mosaic/MosaicFiltersBar/ExplorePicker/Explore';
import Explores from 'views/Mosaic/MosaicFiltersBar/ExplorePicker/Explores';

const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter as any });
};

describe('Explore', () => {
  for (const [explore, expected] of [
    ['community', /community/i],
    ['trending', /trending/i],
    ['latest', /latest/i],
    ['following', /following/i],
  ]) {
    describe(`explore prop is "${explore}"`, () => {
      it(`displays "${expected}"`, () => {
        const { getByText } = render(
          <Explore explore={explore as Explore} dimension="all" />,
          { wrapper: MemoryRouter as any }
        );
        expect(getByText(expected)).toBeInTheDocument();
      });
    });
  }
});

// describe('Explores', () => {
//   describe('user is logged', () => {
//     const stubProps = {
//       isLogged: true,
//       dimension: 'all' as const,
//     };
//     for (const [explore, expected] of [
//       ['community', /community/i],
//       ['trending', /trending/i],
//       ['latest', /latest/i],
//       ['following', /following/i],
//     ]) {
//       it(`displays "${explore}"`, () => {
//         const { getByText } = renderWithRouter(<Explores {...stubProps} />);
//         expect(getByText(expected)).toBeInTheDocument();
//       });
//     }
//   });

//   describe("user isn't logged", () => {
//     const stubProps = {
//       isLogged: false,
//       dimension: 'all' as const,
//     };
//     for (const [explore, expected] of [
//       ['community', /community/i],
//       ['trending', /trending/i],
//       ['latest', /latest/i],
//     ]) {
//       it(`displays "${explore}"`, () => {
//         const { getByText } = renderWithRouter(<Explores {...stubProps} />);
//         expect(getByText(expected)).toBeInTheDocument();
//       });
//     }

//     it('doesn\'t displays "following"', () => {
//       const { queryByText } = renderWithRouter(<Explores {...stubProps} />);
//       expect(queryByText(/following/i)).not.toBeInTheDocument();
//     });
//   });
// });
