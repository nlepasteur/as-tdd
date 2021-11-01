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
  const user_id = req.session.user && req.session.user._id;
  const query = { ...req.body, user_id };
  try {
    const channel = await preferedChannelsService.createPreferedChannel(query);
    console.log('newly stored prefered channel: ', channel);
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
    console.log('removed prefered channel: ', response);
    res.status(200).end();
  } catch (e) {
    next(e);
  }
};
