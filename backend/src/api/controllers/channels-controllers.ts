import type { Request, Response, NextFunction } from 'express';

import services from '../../services';

type RequestHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const { channelsService } = services;

export const getChannels: RequestHandlerMiddleware = async (req, res, next) => {
  try {
    const user_id = req.session.user && req.session.user._id;
    const channels = await channelsService.getChannels({ user_id });
    res.status(200).json({ data: channels });
  } catch (e) {
    next(e);
  }
};
