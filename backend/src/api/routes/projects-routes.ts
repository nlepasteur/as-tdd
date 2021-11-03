import { Router } from 'express';

import {
  createProject,
  getProjectsForMosaic,
} from '../controllers/projects-controllers';

const router = Router();

router.post('/', createProject);

router.get('/community', getProjectsForMosaic);

export default router;
