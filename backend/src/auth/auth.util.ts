import { Response } from 'express';
import { signToken } from '../helpers/crypto.helper';

export function setAuthToken(res: Response, userData: Record<string, any>) {
  // create user auth token;
  const token = signToken(userData);

  res.cookie('authToken', token, { maxAge: 9000000000, httpOnly: true, secure: true });
}
