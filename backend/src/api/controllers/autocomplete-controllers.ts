import type { Request, Response, NextFunction } from 'express';

import services from '../../services';

type RequestHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const { softwaresService } = services;

const getSoftwares: RequestHandlerMiddleware = async (req, res, next) => {
  try {
    console.log('req.query: ', req.query);
    // const softwares = await softwaresService.getSoftwareByRegExp({
    //   name: req.query,
    // });
    // res.json(softwares);
    res.json({ message: 'yoyo' });
  } catch (e) {
    next(e);
  }
};

module.exports = { getSoftwares };
