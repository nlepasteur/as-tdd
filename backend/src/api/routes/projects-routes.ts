import { Router } from 'express';

import { createProject } from '../controllers/projects-controllers';

const router = Router();

router.post('/', createProject);

export default router;
