import { ErrorCodes } from '../services/types';

const errorCodes: ErrorCodes = {
  invalidInput: {
    message: 'Invalid input - must be atleast 3 characters and less than 7',
    code: 400,
  },
  userNotFound: {
    message: 'User not found',
    code: 404,
  },
  userAlreadyExists: {
    message: 'User already exists',
    code: 400,
  },
  invalidRegistrationParams: {
    message: 'Either username or password params are invalid',
    code: 400,
  },
  passwordTooShort: {
    message: 'Password must be atleast 3 characters long',
    code: 400,
  },
  userExists: { message: 'User Already Exists', code: 409 },
  incorrectPassword: { message: 'Incorrect Password', code: 403 },
  invalidRequestUser: { message: 'Invalid request user', code: 400 },
  badToken: { message: 'Bad token', code: 403 },
  alreadyHasTwoFactor: { message: 'Already has two factor', code: 400 },
  badCode: { message: 'Bad code', code: 403 },
};

export default errorCodes;
