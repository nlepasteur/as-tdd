import Channel from '../models/channel-model';

const getChannels =
  (model: typeof Channel) =>
  async ({ user_id = '' }) => {
    console.log('user user_id for pipeline: ', user_id);
    const channels = await model.aggregate([
      {
        $lookup: {
          from: 'prefered-channels',
          as: 'res',
          let: {
            channel_id: '$_id',
            user_id,
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$$channel_id', '$channel_id'],
                    },
                    {
                      $eq: ['$$user_id', '$follower_id'],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$res',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $set: {
          id: '$_id',
          favorite_position: '$res.position',
        },
      },
      {
        $unset: ['_id', 'res', '__v'],
      },
    ]);
    console.log('channels before change! ', channels);
    const after = channels.map((channel) => ({
      ...channel,
      favorite_position:
        'favorite_position' in channel ? channel.favorite_position : null,
    }));
    return after;
  };

const createChannel =
  (model: typeof Channel) =>
  (required: { name: string; image_url: string; uri: string }) => {
    const channel = new model(required);
    return channel.save();
  };

export default (model: typeof Channel) => ({
  getChannels: getChannels(model),
  createChannel: createChannel(model),
});
