import { userExists } from '../db/users';
import errorCodes from '../middleware/errorCodes';
import { LoginParams, RegistrationParams, ResponseUser, User } from './types';

export function isNumber(num: unknown): num is number {
  return typeof num === 'number' && !isNaN(num);
}

export function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}

export function isObject(obj: unknown): obj is object {
  return typeof obj === 'object' && obj != null;
}

export function isBoolean(bool: unknown): bool is boolean {
  return typeof bool === 'boolean';
}

export function isLoginParams(params: unknown): params is LoginParams {
  return isObject(params) && 'username' in params && 'password' in params;
}

export function isRegistrationParams(
  params: unknown
): params is RegistrationParams {
  return isObject(params) && 'username' in params && 'password' in params;
}

export function isResponseUser(user: unknown): user is ResponseUser {
  return (
    isObject(user) &&
    'username' in user &&
    'token' in user &&
    'hasTwoFactor' in user
  );
}

export function isUser(user: unknown): user is User {
  return (
    isObject(user) &&
    'username' in user &&
    'password' in user &&
    'hasTwoFactor' in user
  );
}

export function validateLoginParams(params: unknown): LoginParams {
  if (!isLoginParams(params) || !isString(params.username)) {
    throw errorCodes.nameRequired;
  }
  return params;
}

export function validateRegistrationParams(
  params: unknown
): RegistrationParams {
  if (
    !isRegistrationParams(params) ||
    (!isString(params.username) && !isString(params.password))
  ) {
    throw errorCodes.invalidRegistrationParams;
  } else if (params.username.length < 3 || params.username.length > 7) {
    throw errorCodes.invalidInput;
  } else if (params.password.length < 3) {
    throw errorCodes.passwordTooShort;
  } else if (userExists(params.username)) throw errorCodes.userExists;
  return params;
}

export function validateResponseUser(user: unknown): ResponseUser {
  if (isResponseUser(user)) {
    if (
      !isBoolean(user.hasTwoFactor) ||
      !isString(user.token || !isString(user.username))
    )
      throw errorCodes.invalidRequestUser;
    return user;
  }
  throw errorCodes.invalidRequestUser;
}

export function validateUser(user: unknown): User {
  if (isUser(user)) {
    if (
      !isBoolean(user.hasTwoFactor) ||
      !isString(user.password || !isString(user.username))
    )
      throw errorCodes.invalidRequestUser;
    return user;
  }
  throw errorCodes.invalidRequestUser;
}
