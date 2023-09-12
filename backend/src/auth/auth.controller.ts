import { NextFunction, Request, Response } from 'express';
import { Document, InsertOneResult, MongoServerError } from 'mongodb';
import { isUser } from '../helpers/type.helper';
import { clientError } from '../helpers/response.helper';
import { hashPassword, signToken } from '../helpers/crypto.helper';
import { MongoErrorCodes } from '../enums';
import DB from '../db/db.service';

/**
 * Creates a new user
 */
export async function signup(req: Request, res: Response, next: NextFunction) {
  const userData = req.body;

  // validate user object
  if (!isUser(userData)) {
    return clientError(res, next, 'Invalid user data');
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
  const potentialError = dbResposne as MongoServerError;
  if (potentialError.code === MongoErrorCodes.unique_key_violation) {
    return clientError(res, next, { message: 'User with that email already exists.' }, potentialError);
  }

  if (potentialError.code) {
    return clientError(res, next, { message: 'Unable to create user.' }, potentialError);
  }

  // inserted successfully
  const insertedUser = dbResposne as InsertOneResult<Document>;

  // create user auth token
  const tokenData = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    id: insertedUser.insertedId,
  };
  const token = signToken(tokenData);
  res.cookie('authToken', token, { maxAge: 9000000000, httpOnly: true, secure: true });
  res.send(tokenData);
}
