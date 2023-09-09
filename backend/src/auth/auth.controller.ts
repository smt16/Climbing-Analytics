import { Request, Response } from 'express';
import { isUser } from '../helpers/type.helper';
import { clientError } from '../helpers/response.helper';

export async function signup(req: Request, res: Response) {
  const userData = req.body;

  // validate user object
  if (!isUser(userData)) {
    return clientError(res, 'Invalid user data');
  }

  // encrypt password
  
}
