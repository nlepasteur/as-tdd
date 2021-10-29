import { fireEvent, render } from '@testing-library/react';
// components
import Media from 'views/MosaicFiltersBar/MediasMediumsDropDownPicker/Media';
import Medium from 'views/MosaicFiltersBar/MediasMediumsDropDownPicker/Medium';

describe('MediaMedium', () => {
  const stubBaseProps = { pick: jest.fn(), picked: true };
  const mediaStubProps = { pickable: { name: 'some media' }, ...stubBaseProps };
  const mediumStubProps = {
    pickable: { name: 'some medium', id: 'medium_id', uri: '' },
    ...stubBaseProps,
  };
  for (const [pickable, stubProps, Component] of [
    ['medium', mediumStubProps, <Medium {...mediumStubProps} />] as const,
    ['media', mediaStubProps, <Media {...mediaStubProps} />] as const,
  ]) {
    describe(`"pickable"'s name (${pickable}) is "${stubProps.pickable.name}"`, () => {
      it(`displays "${
        stubProps.pickable.name === 'some media' ? 'media' : 'medium'
      }"`, () => {
        const { getByText } = render(Component);
        expect(getByText(stubProps.pickable.name)).toBeInTheDocument();
      });

      it(`on "${
        stubProps.pickable.name === 'some media' ? 'media' : 'medium'
      }" click calls pick`, () => {
        const { getByRole } = render(Component);
        fireEvent.click(getByRole('checkbox'));
        expect(stubProps.pick).toBeCalled();
      });

      it(`on click calls "pick" with "${
        stubProps.pickable.name === 'some media'
          ? 'some media'
          : 'id' in stubProps.pickable && stubProps.pickable.id
      }" as argument`, () => {
        const expected =
          stubProps.pickable.name === 'some media'
            ? 'some media'
            : 'id' in stubProps.pickable && stubProps.pickable.id;
        const { getByRole } = render(Component);
        fireEvent.click(getByRole('checkbox'));
        expect(stubProps.pick).toBeCalledWith(expected);
      });
    });

    describe(`${
      stubProps.pickable.name === 'some media' ? 'media' : 'medium'
    } is picked`, () => {
      it(`${
        stubProps.pickable.name === 'some media' ? 'media' : 'medium'
      } is checked`, () => {
        const { getByRole } = render(Component);
        expect(getByRole('checkbox')).toHaveAttribute('checked');
      });
    });
  }
});

// describe('MediaMediumContainer', () => {
//   describe('dropdown is close', () => {
//     for (const section of [/mediums/i, /only show projects with/i]) {
//       it(`"${section}" is not visible`, () => {
//         const { queryByText } = render(<MediasMediumsDropDownPicker />);
//         expect(queryByText(section)).not.toBeInTheDocument();
//       });
//     }
//   });

//   describe('dropdown is open', () => {});
// });
