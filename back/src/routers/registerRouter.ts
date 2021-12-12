import express from 'express';
import {
  deleteToken,
  generateTwoFactor,
  validateToken,
} from '../auth_tools/auth_tools';
import { addTwoFactor, addUser } from '../db/users';
import errorCodes from '../middleware/errorCodes';
import { RegistrationParams, ResponseUser, User } from '../services/types';
import {
  validateRegistrationParams,
  validateResponseUser,
  validateUser,
} from '../services/utils';

const router = express.Router();

router.post('/twofactor', (req, res) => {
  const user: ResponseUser = validateResponseUser(req.body);
  // Validate user token
  const storedUser = validateUser(validateToken(user.token));
  if (user.username !== storedUser.username) throw errorCodes.badToken;
  // Generate two factor
  if (storedUser.hasTwoFactor) throw errorCodes.alreadyHasTwoFactor;
  const validation = generateTwoFactor('twofactor', user.username);
  addTwoFactor(user.username, validation.secret, validation.qr);
  deleteToken(user.token);
  res.json({ qr: validation.qr, username: user.username });
});

router.post('', (req, res) => {
  const regParams: RegistrationParams = validateRegistrationParams(req.body);
  const newUser: User = {
    username: regParams.username,
    password: regParams.password,
    hasTwoFactor: false,
  };
  addUser(newUser);
  res.json({ message: 'Welcome!' });
});

export default router;
