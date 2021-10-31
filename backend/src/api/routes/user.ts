// types
import type {
  GridSizePreferencePatchBody,
  GridSizePreferencePostBody,
} from '../../../../types';
// libs
import { Router } from 'express';
// models
import GridPreference from '../../models/GridSizePreference';
// services
import services from '../../services';

type LoggedUserFromSession = {
  _id: string;
  name: string;
  email: string;
  followed_channels: string[];
};

const router = Router();
const { preferedGridSizeService } = services;

router.post('/grid', async (req, res, next) => {
  const body: GridSizePreferencePostBody = req.body;
  const user = req.session.user as LoggedUserFromSession;
  try {
    const response = await preferedGridSizeService.createUserPreferedGridSize({
      ...body,
      user_id: user._id,
    });
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
});

router.get('/grid', async (req, res, next) => {
  const user = req.session.user as LoggedUserFromSession;
  try {
    const response = await preferedGridSizeService.getUserPreferedGridSize({
      user_id: user._id,
    });
    res.status(200).json({ persistence_state: response });
  } catch (e) {
    next(e);
  }
});

router.patch('/grid', async (req, res, next) => {
  const body = req.body as GridSizePreferencePatchBody;
  const user = req.session.user as LoggedUserFromSession;
  try {
    const response = await preferedGridSizeService.updateUserPreferedGridSize({
      ...body,
      user_id: user._id,
    });
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

export default router;
