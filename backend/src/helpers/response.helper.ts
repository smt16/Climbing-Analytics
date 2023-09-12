import { Response } from 'express';

/**
 * Return a client (400) error
 */
export function clientError(res: Response, message: string | Record<string, any>) {
  res.status(400);
  res.send(message);
}
