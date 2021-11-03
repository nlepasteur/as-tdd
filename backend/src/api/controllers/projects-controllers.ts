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

export const getProjectsForMosaic: RequestHandlerMiddleware = async (
  req,
  res,
  next
) => {
  try {
    console.log('req.query: ', req.query);
    const projects = await projectsService.getProjectsForMosaic(
      req.query as {
        per_page: string;
        medium_ids?: string[];
        dimension?: string;
        page: string;
        asset_types?: string[];
      }
    );
    res.status(200).json(projects);
  } catch (e) {
    next(e);
  }
};
