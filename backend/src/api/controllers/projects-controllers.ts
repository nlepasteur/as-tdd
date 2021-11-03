import type { Request, Response, NextFunction } from 'express';

import services from '../../services';

type RequestHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const { projectsService } = services;

export const createProject: RequestHandlerMiddleware = async (
  req,
  res,
  next
) => {
  const body = req.body;
  try {
    const response = await projectsService.createProject(body);
    console.log('newly created project: ', response);
    res.json(response);
  } catch (e) {
    next(e);
  }
};
