import { ErrorCodes } from '../services/types';

const errorCodes: ErrorCodes = {
  invalidInput: {
    message: 'Invalid input - must be atleast 3 characters and less than 7',
    code: 400,
  },
};

export default errorCodes;