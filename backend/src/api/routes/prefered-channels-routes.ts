import { Router } from 'express';

import {
  createPreferedChannel,
  deletePreferedChannel,
} from '../controllers/prefered-channels-controllers';

const router = Router();

router.post('/add', createPreferedChannel);

router.post('/remove', deletePreferedChannel);

export default router;
