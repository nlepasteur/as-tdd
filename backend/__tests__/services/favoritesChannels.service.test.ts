import favoritesChannelsService from '../../src/services/favoritesChannels.service';

describe('favorites channels service', () => {
  describe('createFavoriteChannel', () => {
    it('takes "follower_id" and "channel_id" as arguments', () => {
      const stubBody = { channel_id: '0', follower_id: '1' };
      let args: any;
      const MockModel = function (this: any, payload: any) {
        this.save = () => (args = payload);
      } as any;
      favoritesChannelsService(MockModel).createFavoriteChannel(stubBody);
      expect(args).toEqual(stubBody);
    });
  });

  describe('getCurrentUserFavoritesChannels', () => {
    it('takes "user_id" as argument', () => {
      const stubBody = { user_id: '0' };
      let arg: any;
      const MockModel = {
        find: (payload: any) => (arg = payload),
      } as any;
      favoritesChannelsService(MockModel).getCurrentUserFavoritesChannels({
        user_id: stubBody.user_id,
      });
      expect(arg).toEqual(stubBody);
    });
  });

  //   describe("reorderCurrentUserFavoritesChannels", () => {
  //       it('takes "order" as argument', () => {
  //         const stubBody = { order: [] };
  //         let arg: any;
  //         const MockModel = {
  //             update: ()
  //         }
  //       })
  //   })
});
// préféré ça plutôt que de update à chaque fois un user ou un channel, sinon trop lourd
// donc
// 1 est créé favorite channel
// 2 est relancé fetch avec channels updates
// 3 fetch relancé qui modèle réponse avec aggregation (mélange de channels et de favoritesChannels collections) et ce grâce aux id de user et de channel

// reçoit nouvel ordre composé d'un array avec channels id dans l'ordre
// { _id: '', channel_id: '', user_id: '', position: '' }
