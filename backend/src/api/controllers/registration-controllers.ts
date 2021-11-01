import bcrypt from 'bcryptjs';

import type { Request, Response, NextFunction } from 'express';

import services from '../../services/';

type RequestHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const signup: RequestHandlerMiddleware = async (req, res, next) => {
  const { username, email, password } = req.body as {
    username: string;
    email: string;
    password: string;
  };
  try {
    const alreadyTaken = await services.userService.findUserByUsername({
      username,
    });
    console.log('mongo response: ', alreadyTaken);
    if (!alreadyTaken) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          const error = new Error('internal error');
          res.statusCode = 500;
          next(error);
        }
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            const error = new Error('internal error');
            res.statusCode = 500;
            next(error);
          }
          const newUser = await services.userService.createUser({
            username,
            email,
            password: hash,
          });
          res.status(201).json(newUser);
        });
      });
    } else {
      const error = new Error('username is already used');
      res.statusCode = 403;
      throw error;
    }
  } catch (e) {
    next(e);
  }
};
