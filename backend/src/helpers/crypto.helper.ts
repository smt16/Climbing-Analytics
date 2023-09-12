import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

/**
 * Generate hashed passwords
 */
export function hashPassword(password: string): string {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}

/**
 * Compare decrypted and encrypted passwords
 */
export function checkPassword(hashedPassword: string, rawPassword: string): boolean {
  return compareSync(rawPassword, hashedPassword);
}

/**
 * Sign JSON web token
 */
export function signToken(payload: Record<string, any>) {
  return sign(payload, process.env.AUTH_SECRET as string, { expiresIn: '72h' });
}
