import { Request, Response } from 'express';
import { Document, InsertOneResult } from 'mongodb';
import { isUser } from '../helpers/type.helper';
import { clientError } from '../helpers/response.helper';
import { hashPassword, signToken } from '../helpers/crypto.helper';
import { MongoErrorCodes } from '../enums';
import DB, { dbError } from '../db/db.service';

/**
 * Creates a new user
 */
export async function signup(req: Request, res: Response) {
  const userData = req.body;

  // validate user object
  if (!isUser(userData)) {
    return clientError(res, 'Invalid user data');
  }

  // encrypt password
  userData.password = hashPassword(userData.password);

  // format data
  userData.firstName = userData.firstName.trim();
  userData.email = userData.email.trim();
  userData.lastName = userData.lastName.trim();

  // attempt to save user
  const dbResposne = await DB.insert('users', userData);

  // error handling
  const potentialError = dbResposne as dbError;
  if (potentialError.code === MongoErrorCodes.unique_key_violation) {
    return clientError(res, { message: 'User with that email already exists.' });
  }

  if (potentialError.code) {
    return clientError(res, { message: 'Unable to create user.' });
  }

  // inserted successfully
  const insertedUser = dbResposne as InsertOneResult<Document>;

  // create user auth token
  const tokenData = { ...userData, id: insertedUser.insertedId };
  const token = signToken(tokenData);

  res.cookie('authToken', JSON.stringify(token));
  res.send(dbResposne);
}
