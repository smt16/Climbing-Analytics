import { Request, Response } from 'express';
import { signup } from './auth.controller';

export async function authRouter(req: Request, res: Response) {
  const { path } = req;
  switch (path) {
    case '/auth/signup':
      signup(req, res);
      break;

    default:
      res.status(404);
      res.send('Not found');
      break;
  }
}
