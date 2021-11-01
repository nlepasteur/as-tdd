import { Router } from 'express';

import {
  createPreferedGridSize,
  getPreferedGridSize,
  updatePreferedGridSize,
} from '../controllers/prefered-grid-size-controllers';

const router = Router();

router.post('/grid', createPreferedGridSize);

router.get('/grid', getPreferedGridSize);

router.patch('/grid', updatePreferedGridSize);

export default router;
