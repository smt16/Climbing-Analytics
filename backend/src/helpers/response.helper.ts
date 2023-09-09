import { Response } from 'express';

export function clientError(res: Response, message: string | Record<string, any>) {
  res.status(400);
  res.send(message);
}
