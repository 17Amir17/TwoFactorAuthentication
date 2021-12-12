import express from 'express';
import { compare } from '../auth_tools/auth_tools';
import { getUser } from '../db/users';
import errorCodes from '../middleware/errorCodes';
import { LoginParams, User } from '../services/types';
import { validateLoginParams } from '../services/utils';

const router = express.Router();

router.post('', (req, res) => {
  const loginParams: LoginParams = validateLoginParams(req.body);
  //Get user
  const user: User | undefined = getUser(loginParams.username);
  if (!user) throw errorCodes.userNotFound;
  //Validate password
  if (!compare(user.password, loginParams.password))
    throw errorCodes.incorrectPassword;
  res.json({ message: 'Hello there!' });
});

export default router;
