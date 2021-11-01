import { Router } from 'express';

import { createMedium, getMediums } from '../controllers/mediums-controllers';

const router = Router();

router.get('/', getMediums);

router.post('/', createMedium);

export default router;
