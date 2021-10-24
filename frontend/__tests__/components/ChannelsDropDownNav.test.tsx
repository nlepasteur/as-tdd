// types
import { Channel } from '@api';
import { ChannelItemProps } from 'views/ChannelsNav/ChannelsDropDownNav/ChannelItem';
import { ChannelsListProps } from 'views/ChannelsNav/ChannelsDropDownNav/ChannelsList';
// libraries
import { render, screen, fireEvent } from '@testing-library/react';
// components
import ChannelItem from 'views/ChannelsNav/ChannelsDropDownNav/ChannelItem';
import ChannelsList from 'views/ChannelsNav/ChannelsDropDownNav/ChannelsList';
import ChannelsDropDownNav from 'views/ChannelsNav/ChannelsDropDownNav/ChannelsDropDownContainer';

describe('ChannelItem', () => {
  let stubProps: Omit<ChannelItemProps, 'followChannel' | 'unfollowChannel'>;
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
      };
    });

    it('"follow" button calls "unfollowChannel"', () => {
      let called = false;
      const mockedUnfollowChannel =
        () => async (payload: { channel_id: string }) => {
          called = true;
        };
      render(
        <ChannelItem
          {...stubProps}
          followChannel={jest.fn()}
          unfollowChannel={mockedUnfollowChannel}
        />
      );
      fireEvent.click(screen.getByRole('checkbox'));
      expect(called).toBeTruthy();
    });

    it('"follow" button doesn\'t call "followChannel"', () => {
      let called = false;
      const mockedUnfollowChannel =
        () => async (payload: { channel_id: string }) => {};
      const mockedFollowChannel =
        () => async (payload: { channel_id: string; position: number }) => {
          called = true;
        };
      render(
        <ChannelItem
          {...stubProps}
          followChannel={mockedFollowChannel}
          unfollowChannel={mockedUnfollowChannel}
        />
      );
      fireEvent.click(screen.getByRole('checkbox'));
      expect(called).toBeFalsy();
    });

    it('"follow" button calls "unfollowChannel" with "channel_id" property', () => {
      let args;
      const mockedUnfollowChannel =
        () => async (payload: { channel_id: string }) => {
          args = payload;
        };
      render(
        <ChannelItem
          {...stubProps}
          followChannel={jest.fn()}
          unfollowChannel={mockedUnfollowChannel}
        />
      );
      fireEvent.click(screen.getByRole('checkbox'));
      expect(args).toEqual({
        channel_id: stubProps.channel.id,
      });
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
      };
    });

    it('"follow" button calls "followChannel"', () => {
      let called = false;
      const mockedfollowChannel =
        () => async (payload: { channel_id: string; position: number }) => {
          called = true;
        };
      render(
        <ChannelItem
          {...stubProps}
          followChannel={mockedfollowChannel}
          unfollowChannel={jest.fn()}
        />
      );
      fireEvent.click(screen.getByRole('checkbox'));
      expect(called).toBeTruthy();
    });

    it('"follow" button doesn\'t call "unfollowChannel"', () => {
      let called = false;
      const mockedFollowChannel =
        () => async (payload: { channel_id: string; position: number }) => {};
      const mockedUnfollowChannel =
        () => async (payload: { channel_id: string }) => {
          called = true;
        };
      render(
        <ChannelItem
          {...stubProps}
          followChannel={mockedFollowChannel}
          unfollowChannel={mockedUnfollowChannel}
        />
      );
      fireEvent.click(screen.getByRole('checkbox'));
      expect(called).toBeFalsy();
    });

    it('"follow" button calls "followChannel" with "channel_id" and "position" properties', () => {
      let args;
      const mockedfollowChannel =
        () => async (payload: { channel_id: string; position: number }) => {
          args = payload;
        };
      render(
        <ChannelItem
          {...stubProps}
          followChannel={mockedfollowChannel}
          unfollowChannel={jest.fn()}
        />
      );
      fireEvent.click(screen.getByRole('checkbox'));
      expect(args).toEqual({
        channel_id: stubProps.channel.id,
        position: stubProps.followedLength,
      });
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
  setFollowedLength: jest.fn(),
  followChannel: jest.fn(),
  unfollowChannel: jest.fn(),
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
