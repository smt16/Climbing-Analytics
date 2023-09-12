import { NextFunction, Request, Response } from 'express';
import { signup, login } from './auth.controller';
import { requestStartLog } from '../helpers/logHelper';

export async function authRouter(req: Request, res: Response, next: NextFunction) {
  const { path } = req;
  requestStartLog(path);

  switch (path) {
    case '/auth/signup':
      await signup(req, res, next);
      break;

    case '/auth/login':
      await login(req, res, next);
      break;

    default:
      res.status(404);
      res.send('Not found');
      break;
  }
}
