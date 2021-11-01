import { Router } from 'express';

import { getChannels } from '../controllers/channels-controllers';

const router = Router();

router.get('/', getChannels);

export default router;
