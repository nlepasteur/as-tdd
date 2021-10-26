import channelsService from '../../src/services/channels.service';

describe('channels service', () => {
  describe('getChannels', () => {
    it('calls find', () => {
      let called = false;
      const mockModel = {
        find: () => (called = true),
      } as any;
      channelsService(mockModel).getChannels();
      expect(called).toBeTruthy();
    });
  });

  describe('createChannel', () => {
    it('creates a Channel instance with "image_url", "uri" and "name" as arguments', () => {
      const stubArgs = {
        name: 'channel name',
        uri: '',
        image_url: '',
      };
      let args: any;
      const MockModel = function (this: any, payload: any) {
        this.save = () => (args = payload);
      } as any;
      channelsService(MockModel).createChannel(stubArgs);
      expect(args).toEqual(stubArgs);
    });

    it('calls save', () => {
      let called = false;
      const MockModel = function (this: any) {
        this.save = () => (called = true);
      } as any;
      channelsService(MockModel).createChannel('');
      expect(called).toBeTruthy();
    });
  });
});
