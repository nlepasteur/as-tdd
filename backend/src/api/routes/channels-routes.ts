import { Router } from 'express';

import {
  getChannels,
  createChannel,
} from '../controllers/channels-controllers';

const router = Router();

router.get('/', getChannels);

router.post('/', createChannel);

export default router;
