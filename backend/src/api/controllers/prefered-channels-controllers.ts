import type { Request, Response, NextFunction } from 'express';

import services from '../../services';

type RequestHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const { preferedChannelsService } = services;

export const createPreferedChannel: RequestHandlerMiddleware = async (
  req,
  res,
  next
) => {
  const follower_id = req.session.user && req.session.user._id;
  const query = { ...req.body, follower_id };
  try {
    const channel = await preferedChannelsService.createPreferedChannel(query);
    res.status(201).end();
  } catch (e) {
    next(e);
  }
};

export const deletePreferedChannel: RequestHandlerMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const response = await preferedChannelsService.deletePreferedChannel(
      req.body
    );
    res.status(200).end();
  } catch (e) {
    next(e);
  }
};
