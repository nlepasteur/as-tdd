// types
import { Channel } from '@api';
import { Props as ChannelItemProps } from 'views/ChannelsDropDownNav/ChannelsList/ChannelItem';
import { Props as ChannelsListProps } from 'views/ChannelsDropDownNav/ChannelsList';
// libraries
import { render, screen, fireEvent } from '@testing-library/react';
// components
import ChannelItem from 'views/ChannelsDropDownNav/ChannelsList/ChannelItem';
import ChannelsList from 'views/ChannelsDropDownNav/ChannelsList';
import ChannelsDropDownNav from 'views/ChannelsDropDownNav';

describe('ChannelItem', () => {
  let stubProps: ChannelItemProps;
  describe('channel is followed', () => {
    beforeEach(() => {
      stubProps = {
        channel: {
          favorite_position: 0,
          id: '',
          image_url: '',
          name: '',
          uri: '',
        },
        followedLength: 1,
        followChannel: jest.fn(),
        unfollowChannel: jest.fn(),
      };
      render(<ChannelItem {...stubProps} />);
      fireEvent.click(screen.getByRole('checkbox'));
    });

    it('"follow/unfollow" button calls "unfollowChannel"', () => {
      expect(stubProps.unfollowChannel).toBeCalled();
    });

    it('"follow/unfollow" button doesn\'t call "followChannel"', () => {
      expect(stubProps.followChannel).toBeCalledTimes(0);
    });
  });

  describe("channel isn't followed", () => {
    beforeEach(() => {
      stubProps = {
        channel: {
          favorite_position: null,
          id: '',
          image_url: '',
          name: '',
          uri: '',
        },
        followedLength: 1,
        followChannel: jest.fn(),
        unfollowChannel: jest.fn(),
      };
      render(<ChannelItem {...stubProps} />);
      fireEvent.click(screen.getByRole('checkbox'));
    });

    it('"follow/unfollow" button calls "followChannel"', () => {
      expect(stubProps.followChannel).toBeCalled();
    });

    it('"follow/unfollow" button doesn\'t call "unfollowChannel"', () => {
      expect(stubProps.unfollowChannel).toBeCalledTimes(0);
    });
  });
});

describe('ChannelsList', () => {
  const baseStubProps: Omit<
    ChannelsListProps,
    | 'queryResultChannels'
    | 'followedChannels'
    | 'allChannels'
    | 'searchBarInputValue'
  > = {
    channels: [
      {
        favorite_position: 0,
        id: '0',
        image_url: '',
        name: 'channel 1',
        uri: '',
      },
      {
        favorite_position: 1,
        id: '1',
        image_url: '',
        name: 'channel 2',
        uri: '',
      },
      {
        favorite_position: null,
        id: '2',
        image_url: '',
        name: 'channel 3',
        uri: '',
      },
    ],
    followedLength: 1,
    followChannel: jest.fn(),
    unfollowChannel: jest.fn(),
    reorderChannels: jest.fn(),
  };
  describe('given 3 channels including 1 followed', () => {
    it('displays 3 channels in "All channels" section', () => {
      const { getAllByText } = render(
        <ChannelsList {...baseStubProps} allChannels />
      );
      expect(getAllByText(/channel \d+/).length).toEqual(3);
    });

    it('displays 2 channels in "Channels you follow" section', () => {
      const { getAllByText } = render(
        <ChannelsList {...baseStubProps} followedChannels />
      );
      expect(getAllByText(/channel \d+/).length).toEqual(2);
    });

    it('given "2" as input value from channels search bar, displays channels containing this string, here 1', () => {
      const { getAllByText } = render(
        <ChannelsList
          {...baseStubProps}
          queryResultChannels
          searchBarInputValue="2"
        />
      );
      expect(getAllByText(/channel \d+/).length).toEqual(1);
    });
  });

  it('"All channels" is closable', () => {
    const { getByRole, queryAllByText } = render(
      <ChannelsList {...baseStubProps} allChannels />
    );
    fireEvent.click(getByRole('button'));
    expect(
      queryAllByText(/channel \d+/).every((channel) => channel === null)
    ).toBeTruthy();
  });
});

const stubProps = {
  isLogged: true,
  fetchStatus: 'success' as const,
  error: null,
  channels: [
    {
      favorite_position: 0,
      id: '0',
      image_url: '',
      name: 'channel 1',
      uri: '',
    },
    {
      favorite_position: null,
      id: '1',
      image_url: '',
      name: 'channel 2',
      uri: '',
    },
  ] as Channel[],
  followedLength: 1,
  followChannel: jest.fn(),
  unfollowChannel: jest.fn(),
  reorderChannels: jest.fn(),
};

describe('ChannelsDropDownNav', () => {
  describe('ChannelDropDownNav is close', () => {
    for (const text of ['All channels', 'Channels you follow']) {
      it(`"${text}" is not visible`, () => {
        const { queryByText } = render(<ChannelsDropDownNav {...stubProps} />);
        expect(queryByText(text)).not.toBeInTheDocument();
      });
    }

    it('input is not visible', () => {
      const { queryByRole } = render(<ChannelsDropDownNav {...stubProps} />);
      expect(queryByRole('textbox')).not.toBeInTheDocument();
    });

    it("is disable as long as channels fetching isn't finished", () => {
      const { getByRole } = render(
        <ChannelsDropDownNav {...stubProps} fetchStatus={'fetching'} />
      );
      expect(getByRole('button')).toHaveAttribute('disabled');
    });
  });

  describe('ChannelDropDownNav is open', () => {
    describe('user is logged', () => {
      beforeEach(() => {
        render(<ChannelsDropDownNav {...stubProps} />);
        fireEvent.click(screen.getByRole('button'));
      });

      it('input is visible', () => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      it('"All channels" is visible', () => {
        expect(screen.getByText('All channels')).toBeInTheDocument();
      });

      it('"Channels you follow" is visible', () => {
        expect(screen.getByText('Channels you follow')).toBeInTheDocument();
      });

      it('displays "x results" if there is one character or more as input value', () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'any input' } });
        expect(screen.getByText(/\d+ results/)).toBeInTheDocument();
      });
    });

    describe("user isn't logged", () => {
      beforeEach(() => {
        render(<ChannelsDropDownNav {...stubProps} isLogged={false} />);
        fireEvent.click(screen.getByRole('button'));
      });

      it('input is visible', () => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      it('"All channels" is visible', () => {
        expect(screen.getByText('All channels')).toBeInTheDocument();
      });

      it('"Channels you follow" isn\'t visible', () => {
        expect(
          screen.queryByText('Channels you follow')
        ).not.toBeInTheDocument();
      });

      it('displays "x results" if there is one character or more as input value', () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'any input' } });
        expect(screen.getByText(/\d+ results/)).toBeInTheDocument();
      });
    });
  });
});
