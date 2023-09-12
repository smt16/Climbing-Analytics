import { NextFunction, Request, Response } from 'express';
import { signup } from './auth.controller';

export async function authRouter(req: Request, res: Response, next: NextFunction) {
  const { path } = req;
  switch (path) {
    case '/auth/signup':
      console.log('\nHandling request for /auth/signup \n');
      await signup(req, res, next);
      break;

    default:
      res.status(404);
      res.send('Not found');
      break;
  }
}
