import { NextFunction, Request, Response } from 'express';
import { Document, InsertOneResult, MongoServerError } from 'mongodb';
import { isUser } from '../helpers/type.helper';
import { clientError } from '../helpers/response.helper';
import { checkPassword, hashPassword } from '../helpers/crypto.helper';
import { MongoErrorCodes } from '../enums';
import DB from '../db/db.service';
import { setAuthToken } from './auth.util';

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
  const tokenData = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    id: insertedUser.insertedId,
  };
  setAuthToken(res, tokenData);

  res.send(tokenData);
}

/**
 * Login for user
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  // fetch user from DB
  const user = await DB.getOne(next, 'users', { email: body.email });

  // if user not found return error
  if (!user) {
    return clientError(res, next, 'Invalid username or password');
  }

  // if passwords do not match return error
  if (!checkPassword(user.password, body.password)) {
    return clientError(res, next, 'Invalid username or password');
  }

  // passwords matched
  const tokenData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: user['_id'],
  };
  setAuthToken(res, tokenData);

  res.send(tokenData);
}
