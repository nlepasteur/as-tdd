// libraries
import { Router } from 'express';
// models
import Channel from '../../models/Channel';
// services
import services from '../../services';

const { channelService, favoritesChannelsService } = services;

const router = Router();

router.post('/', async (req, res, next) => {
  const { body } = req;
  console.log('body: ', body);
  try {
    await channelService.createChannel(body);
    res.status(201).end();
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  console.log(req.session.user);
  try {
    const channels = await Channel.aggregate([
      {
        $lookup: {
          from: 'favorites',
          as: 'res',
          let: {
            channel_id: '$_id',
            user_id: req.session.user._id,
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
    const consistentShapesChannels = channels.map((channel) => ({
      ...channel,
      favorite_position:
        'favorite_position' in channel ? channel.favorite_position : null,
    }));
    res.status(200).json({ data: consistentShapesChannels });
  } catch (e) {
    next(e);
  }
});

router.post('/favorites/add', async (req, res, next) => {
  const { body, session } = req;
  const query = {
    ...body,
    follower_id: session.user._id,
  };
  try {
    await favoritesChannelsService.createFavoriteChannel(query);
    res.status(201).end();
  } catch (e) {
    next(e);
  }
});

router.post('/favorites/remove', async (req, res, next) => {
  const { body } = req;
  try {
    const response = await favoritesChannelsService.deleteFavoriteChannel(body);
    console.log('response: ', response);
    res.status(200).end();
  } catch (e) {
    next(e);
  }
});

export default router;
