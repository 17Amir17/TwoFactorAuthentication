import { User } from './types';

export function isNumber(num: unknown): num is number {
  return typeof num === 'number' && !isNaN(num);
}

export function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}

export function isBoolean(bool: unknown): bool is boolean {
  return typeof bool === 'boolean';
}

export function isObject(obj: unknown): obj is object {
  return typeof obj === 'object' && obj != null;
}

export function isUser(obj: unknown): obj is User {
  return (
    isObject(obj) &&
    'username' in obj &&
    'hasTwoFactor' in obj &&
    'token' in obj
  );
}

export function validateUser(user: unknown): User {
  if (isUser(user)) {
    if (!isString(user.username)) throw new Error('Username is not string');
    if (!isString(user.token)) throw new Error('Invalid token');
    if (!isBoolean(user.hasTwoFactor)) throw new Error('Invalid two factor');
    return user;
  }
  throw new Error('Invalid user');
}
