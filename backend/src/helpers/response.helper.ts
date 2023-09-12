import { NextFunction, Response } from 'express';

/**
 * Return a client (400) error
 */
export function clientError(res: Response, next: NextFunction, message: string | Record<string, any>, err?: any) {
  const errorLog = err || message;
  next(errorLog);
  res.status(400);
  res.send(message);
}
