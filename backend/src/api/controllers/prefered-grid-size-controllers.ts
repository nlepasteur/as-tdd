import type { Request, Response, NextFunction } from 'express';
import {
  PreferedGridSizePostBody,
  PreferedGridSizePatchBody,
} from '../../../../types';

import services from '../../services';

type RequestHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const { preferedGridSizeService } = services;

export const createPreferedGridSize: RequestHandlerMiddleware = async (
  req,
  res,
  next
) => {
  const user_id = req.session.user && req.session.user._id;
  try {
    const response = await preferedGridSizeService.createUserPreferedGridSize({
      ...req.body,
      user_id,
    });
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

export const getPreferedGridSize: RequestHandlerMiddleware = async (
  req,
  res,
  next
) => {
  const user_id = (req.session.user && req.session.user._id) as string;
  try {
    const response = await preferedGridSizeService.getUserPreferedGridSize({
      user_id,
    });
    res.status(200).json({ persistence_state: response });
  } catch (e) {
    next(e);
  }
};

export const updatePreferedGridSize: RequestHandlerMiddleware = async (
  req,
  res,
  next
) => {
  const user_id = req.session.user && req.session.user._id;
  try {
    const response = await preferedGridSizeService.updateUserPreferedGridSize({
      ...req.body,
      user_id,
    });
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
