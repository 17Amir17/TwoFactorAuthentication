import { userExists } from '../db/users';
import errorCodes from '../middleware/errorCodes';
import { RegistrationParams } from './types';

export function isNumber(num: unknown): num is number {
  return typeof num === 'number' && !isNaN(num);
}

export function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}

export function isObject(obj: unknown): obj is object {
  return typeof obj === 'object' && obj != null;
}

export function isRegistrationParams(
  params: unknown
): params is RegistrationParams {
  return isObject(params) && 'username' in params && 'password' in params;
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
