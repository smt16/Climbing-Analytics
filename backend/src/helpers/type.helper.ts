import { User } from '../db/models/user';

export function isUser(user: Record<string, any>): user is User {
  return (
    typeof user === 'object'
    && typeof user?.firstName === 'string'
    && typeof user?.lastName === 'string'
    && typeof user?.email === 'string'
    && typeof user?.password === 'string'
  );
}
