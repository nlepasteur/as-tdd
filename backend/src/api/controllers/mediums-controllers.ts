import type { Request, Response, NextFunction } from 'express';

import services from '../../services';

type RequestHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const { mediumsService } = services;

export const getMediums: RequestHandlerMiddleware = async (req, res, next) => {
  try {
    const mediums = await mediumsService.getMediums();
    res.status(200).json(mediums);
  } catch (e) {
    next(e);
  }
};

export const createMedium: RequestHandlerMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const medium = await mediumsService.createMedium(req.body);
    res.status(201).json(medium);
  } catch (e) {
    next(e);
  }
};
